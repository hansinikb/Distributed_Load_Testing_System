# Distributed_Load_Testing_System
Install java
sudo apt-get install openjdk-8-jdk -y

Installing Go & Kafka
Head over to the Installation Files and execute the following commands to install Go and Kafka

sudo chmod a+x *.sh
source go.sh
source kafka.sh


kafka.sh:
'''
#!/bin/bash
start_dir=$(pwd)
echo "Starting Kafka installation"

# Update and upgrade the system
sudo apt-get update -y
sudo apt-get upgrade -y

# Delete previous Kafka files and installations
echo "Deleting previous Kafka files and installations"
sudo rm -rf kafka*
if [ -d "/usr/local/kafka" ]; then
    sudo rm -rf /usr/local/kafka
fi

# Download Kafka
echo "Downloading Kafka binaries"
wget https://archive.apache.org/dist/kafka/3.6.0/kafka_2.12-3.6.0.tgz

# Extract Kafka
echo "Decompressing tar archive for Kafka"
tar -xf kafka_2.12-3.6.0.tgz
sudo mv kafka_2.12-3.6.0 /usr/local/kafka

# Setting up zookeeper.service
echo "Setting up zookeeper.service"
sudo bash -c 'cat <<EOL > /etc/systemd/system/zookeeper.service
[Unit]
Description=Apache Zookeeper server
Documentation=http://zookeeper.apache.org
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
ExecStart=/usr/local/kafka/bin/zookeeper-server-start.sh /usr/local/kafka/config/zookeeper.properties
ExecStop=/usr/local/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target
EOL'

# Setting up kafka.service
echo "Setting up kafka.service"
sudo bash -c 'cat <<EOL > /etc/systemd/system/kafka.service
[Unit]
Description=Apache Kafka Server
Documentation=http://kafka.apache.org/documentation.html
Requires=zookeeper.service

[Service]
Type=simple
Environment="JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64"
ExecStart=/usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties
ExecStop=/usr/local/kafka/bin/kafka-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target
EOL'

echo "Successfully created services"

# Change ownership of Kafka directory
sudo chown -R $USER:$USER /usr/local/kafka

# Reload systemd manager configuration
sudo systemctl daemon-reload

# Start Zookeeper and Kafka services
sudo systemctl start zookeeper
sudo systemctl start kafka
sleep 5

echo "---------------"
sudo systemctl is-active --quiet kafka
if [ $? -eq 0 ]; then
    echo "Kafka has been successfully installed and started"
else
    echo "Error in starting Kafka. Check logs at /usr/local/kafka/logs"
fi

echo "---------------"
echo ""
echo "If you wish to stop Kafka, run the following commands"
echo "sudo systemctl stop kafka"

echo "To check the status of Kafka, run the following command"
echo "sudo systemctl status kafka"

cd "$start_dir"
'''
