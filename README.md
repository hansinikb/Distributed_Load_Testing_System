# Distributed Load Testing System

## Goal

Design and build a distributed load-testing system that co-ordinates between
multiple driver nodes to run a highly concurrent, high-throughput load test on a
web server. This system will use Kafka as a communication service.

![image](https://github.com/user-attachments/assets/527f5848-ee05-4f46-907a-8ed482fd26c8)

## Demo

## Functionality

### System Communication

The system utilizes Kafka as a single point of communication, publishing and subscribing to the following topics:

* `register`: All driver nodes register themselves to the orchestrator through this topic.
* `test_config`: Orchestrator node sends out test configurations to all driver nodes.
* `trigger`: Orchestrator node triggers the load test.
* `metrics`: Driver nodes publish their aggregate metrics during the load test.
* `heartbeat`: Driver nodes publish their heartbeats at all times.

### Load Test Types

* **Tsunami Testing:**
  * Users can set a delay interval between each request, maintained by the system.
* **Avalanche Testing:**
  * All requests are sent as soon as they are ready in first-come first-serve order.

### Observability

* The Orchestrator node tracks the number of requests sent by each driver node, updating at a maximum interval of one second.
* The frontend a dashboard with aggregated {min, max, mean, median, mode} response latency across all nodes and for each node.
* The orchestrator node stores the reports of each test and each node at the end of the test as JSON files.
* 
### Code
## Orchestrator Node

Expose a REST API to view and control different tests.
Handle heartbeats from Driver Nodes.
Coordinate between driver nodes to trigger load tests.
Receive and store metrics from driver nodes.

## Driver Node

Send requests to the target webserver as indicated by the Orchestrator node.
Record and send back statistics.
Target HTTP Server

Implement /ping and /metrics endpoints.
### Dockerization

* The orchestrator and driver node services are Dockerized for easy deployment and management. The Docker Compose file provided can be used to spin up the required containers for the entire system.

## Setup

### Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```
2. Start the server and scale the number of driver nodes (`n` is the desired number of nodes):

   ```bash
   docker-compose up --scale driver = <n>
   ```
3. For troubleshooting Kafka container:

   ```bash
   docker exec -it kafka1 /bin/bash
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install Dependencies:

   ```bash
   npm install
   ```
3. Start the frontend server:

   ```bash
   npm start
   ```
