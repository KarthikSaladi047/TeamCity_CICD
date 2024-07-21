# Getting Started with TeamCity

## Introduction to TeamCity
TeamCity is a powerful Continuous Integration (CI) and Continuous Deployment (CD) server developed by JetBrains. It provides a comprehensive set of tools and features that enable development teams to automate the building, testing, and deployment of their applications. With its intuitive web interface, robust build configuration options, and extensive plugin ecosystem, TeamCity helps streamline the software development process and improve productivity.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9426eaae-f1c0-4f4e-8529-90f5a3a721fd" />
</p>

### Key features of TeamCity include:

- Ease of Setup and Use: TeamCity offers a straightforward setup process and an intuitive web interface, making it accessible to both beginners and experienced CI/CD users.
- Scalability: TeamCity supports parallel builds and distributed build infrastructure, allowing it to scale with your project's needs.
- VCS Integration: TeamCity integrates seamlessly with various version control systems (VCS) such as Git, Mercurial, Subversion, and more, enabling automated builds based on code changes.
- Extensibility: With a rich plugin ecosystem, TeamCity can be extended to support various build tools, testing frameworks, and deployment environments.
- Build Configuration as Code: TeamCity supports configuration as code using Kotlin DSL, making it easier to version and manage build configurations.
- Comprehensive Build History: TeamCity maintains detailed build logs and history, allowing developers to track and analyze the progress and results of their builds.
- Continuous Feedback: TeamCity provides real-time feedback on build status, test results, and code quality, helping teams identify and address issues quickly.

By leveraging TeamCity, development teams can automate repetitive tasks, enforce quality standards, and accelerate the delivery of their software projects.

### Prerequisites
- Docker installed on your machine.
- Docker Hub account - for this project I am using karthiksaladi047/react-app:tagname.
- GiHub account - for this project I am using https://github.com/KarthikSaladi047/TeamCity_CICD.
- Basic knowledge of Docker and CI/CD concepts.
- Visit the TeamCity [Home](https://www.jetbrains.com/teamcity/) & [Download](https://www.jetbrains.com/teamcity/download/) Page before proceeding further.

![image](https://github.com/user-attachments/assets/665db028-ac67-4e8b-9fed-83d32eb35548)

### Step 1: Set Up TeamCity

#### Set Up TeamCity Server as Docker Conatiner:

- Open your terminal.
- Pull the TeamCity server Docker image.
  ```
  docker pull jetbrains/teamcity-server
  ```
- Run the TeamCity server container.
  ```
  docker run --name teamcity-server-instance -v team_city_server_data:/data/teamcity_server/datadir -v team_city_server_logs:/opt/teamcity/logs -p 8111:8111 -d jetbrains/teamcity-server
  ```

#### Set Up TeamCity Agent as Docker Conatiner:

- Pull the TeamCity agent Docker image.
  ```
  docker pull jetbrains/teamcity-agent
  ```
- Run the TeamCity agent containers (2nd conatiner uses docker from Host).
  ```
  docker run -e SERVER_URL="http://<Server_IP_Addr>:8111" -v team_city_agent_conf:/data/teamcity_agent/conf -d jetbrains/teamcity-agent
  docker run -e SERVER_URL="http://<Server_IP_Addr>:8111" -v team_city_agent_conf_2:/data/teamcity_agent/conf -v /var/run/docker.sock:/var/run/docker.sock  -u 0 -d jetbrains/teamcity-agent
  ```
- Verify conatiner status
  ```
  root@karthik-server:~# docker ps -a
  CONTAINER ID   IMAGE                       COMMAND              CREATED          STATUS          PORTS                                       NAMES
  0c5f60bbe75b   jetbrains/teamcity-agent    "/run-services.sh"   29 seconds ago   Up 22 seconds                                               casel_nuts
  0c5f60bbe75b   jetbrains/teamcity-agent    "/run-services.sh"   29 seconds ago   Up 22 seconds                                               adoring_germain
  c3f74e80d0de   jetbrains/teamcity-server   "/run-services.sh"   59 seconds ago   Up 52 seconds   0.0.0.0:8111->8111/tcp, :::8111->8111/tcp   teamcity-server-instance
  root@karthik-server:~#
  ```

### Step 2: Create a Build Configuration

#### Access TeamCity:

- Open your browser and go to http://<Server_IP_Addr>:8111.

  ![image](https://github.com/user-attachments/assets/36ef19e0-90cf-4889-84ef-26588a49542c)

- Follow the setup wizard to configure your TeamCity server. Select the Default Database, Whcih is loacl DB.
  
  ![image](https://github.com/user-attachments/assets/262f2f9b-be92-49be-bb55-1def6e427088)

#### Create a New Project:

- In the TeamCity web interface, click on "+" adjacent to Projects.

  ![Pasted Graphic 3](https://github.com/user-attachments/assets/334ef1eb-d8a8-425d-afc0-3584e296fd65)

- Provide Repository details that you are looking to work with.

  ![Pasted Graphic 20](https://github.com/user-attachments/assets/a5d69eb4-c335-4cad-913d-edfac3bb806f)

- validate the access from teamcity to GiHub.
  ![Pasted Graphic 20](https://github.com/user-attachments/assets/c965c993-9063-47a2-beec-9fdf69ef2ec6)

#### Create a Build Configuration:

- Since we created a fresh project, a default Build will be created with name "Build".
  
  ![Pasted Graphic 3](https://github.com/user-attachments/assets/8e8c0de8-b999-42af-8cae-4c9b2375c36f)

- Now click on "configure build steps manually" proceed to configure the build steps.

### Step 3: Configure Build Steps

#### Add Build Steps:

- Select runner type Docker.

  ![Pasted Graphic 6](https://github.com/user-attachments/assets/bda429f2-d3ee-49ea-a0e3-ad1d90edafc0)

- Configure the build step as shown in below image.

  ![Pasted Graphic 8](https://github.com/user-attachments/assets/0e834a40-7326-4c7c-82d0-36890f6972c6)

- Add a build step to Push the Docker image.

  ![image](https://github.com/user-attachments/assets/d6420389-5f0a-4d6f-9c84-acfb9384f8e9)

- Configure the build step as shown in below image.

  ![Pasted Graphic 25](https://github.com/user-attachments/assets/b90809d3-64b0-4006-8e52-1b675beb4f6c)

- Now you will see both build steps.

  ![Pasted Graphic 27](https://github.com/user-attachments/assets/9b009c78-d1c9-4318-9e5f-51d5c2fc9089)



Step 4: Trigger a Build
Set Up Triggers:

Go to the "Triggers" tab in your build configuration.
Add a new trigger (e.g., VCS Trigger) to start a build on code changes.
Run the Build:

Manually trigger the build by clicking "Run" or push a change to your repository to trigger the build automatically.
Step 5: Verify the Build
Check Build Status:

Monitor the build progress in the TeamCity web interface.
Verify that the Docker image is built and pushed to Docker Hub successfully.
Verify Docker Hub:

Log in to your Docker Hub account.
Check if the new Docker image appears in your repository.
