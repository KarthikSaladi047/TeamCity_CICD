# Getting Started with TeamCity <a href="https://www.jetbrains.com/teamcity/" target="_blank" rel="noreferrer"> <img src="https://github.com/gilbarbara/logos/blob/main/logos/teamcity.svg" alt="teamcity" width="30" height="30"/></a>

## ⭐️ Introduction to TeamCity
TeamCity is a powerful Continuous Integration (CI) and Continuous Deployment (CD) server developed by JetBrains. It provides a comprehensive set of tools and features that enable development teams to automate the building, testing, and deployment of their applications. With its intuitive web interface, robust build configuration options, and extensive plugin ecosystem, TeamCity helps streamline the software development process and improve productivity.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9426eaae-f1c0-4f4e-8529-90f5a3a721fd" />
</p>

### 🎯 Key features of TeamCity include:

- Ease of Setup and Use: TeamCity offers a straightforward setup process and an intuitive web interface, making it accessible to both beginners and experienced CI/CD users.
- Scalability: TeamCity supports parallel builds and distributed build infrastructure, allowing it to scale with your project's needs.
- VCS Integration: TeamCity integrates seamlessly with various version control systems (VCS) such as Git, Mercurial, Subversion, and more, enabling automated builds based on code changes.
- Extensibility: With a rich plugin ecosystem, TeamCity can be extended to support various build tools, testing frameworks, and deployment environments.
- Build Configuration as Code: TeamCity supports configuration as code using Kotlin DSL, making it easier to version and manage build configurations.
- Comprehensive Build History: TeamCity maintains detailed build logs and history, allowing developers to track and analyze the progress and results of their builds.
- Continuous Feedback: TeamCity provides real-time feedback on build status, test results, and code quality, helping teams identify and address issues quickly.

By leveraging TeamCity, development teams can automate repetitive tasks, enforce quality standards, and accelerate the delivery of their software projects.

### 🧪 Prerequisites
- Docker installed on your machine.
- Docker Hub account - for this project, I am using karthiksaladi047/react-app:tagname.
- GitHub account - for this project, I am using https://github.com/KarthikSaladi047/TeamCity_CICD.
- Basic knowledge of Docker and CI/CD concepts.
- Visit the TeamCity [Home](https://www.jetbrains.com/teamcity/) & [Download](https://www.jetbrains.com/teamcity/download/) Page before proceeding further.

![image](https://github.com/user-attachments/assets/665db028-ac67-4e8b-9fed-83d32eb35548)

### Step ☝🏻: Set Up TeamCity

#### Set Up TeamCity Server as Docker Container:

- Open your terminal.
- Pull the TeamCity server Docker image.
  ```
  docker pull jetbrains/teamcity-server
  ```
- Run the TeamCity server container.
  ```
  docker run --name teamcity-server-instance -v team_city_server_data:/data/teamcity_server/datadir -v team_city_server_logs:/opt/teamcity/logs -p 8111:8111 -d jetbrains/teamcity-server
  ```

#### Set Up TeamCity Agent as Docker Container:

- Pull the TeamCity agent Docker image.
  ```
  docker pull jetbrains/teamcity-agent
  ```
- Run the TeamCity agent containers (2nd container uses docker from Host).
  ```
  docker run -e SERVER_URL="http://<Server_IP_Addr>:8111" -v team_city_agent_conf:/data/teamcity_agent/conf -d jetbrains/teamcity-agent
  docker run -e SERVER_URL="http://<Server_IP_Addr>:8111" -v team_city_agent_conf_2:/data/teamcity_agent/conf -v /var/run/docker.sock:/var/run/docker.sock  -u 0 -d jetbrains/teamcity-agent
  ```
- Verify container status
  ```
  root@karthik-server:~# docker ps -a
  CONTAINER ID   IMAGE                       COMMAND              CREATED          STATUS          PORTS                                       NAMES
  bec5b70f605b   jetbrains/teamcity-agent    "/run-services.sh"   29 seconds ago   Up 22 seconds                                               casel_nuts
  0c5f60bbe75b   jetbrains/teamcity-agent    "/run-services.sh"   29 seconds ago   Up 22 seconds                                               adoring_germain
  c3f74e80d0de   jetbrains/teamcity-server   "/run-services.sh"   59 seconds ago   Up 52 seconds   0.0.0.0:8111->8111/tcp, :::8111->8111/tcp   teamcity-server-instance
  root@karthik-server:~#
  ```

### Step ✌🏻: Create a Project & Build Configuration

#### Access TeamCity:

- Open your browser and go to http://<Server_IP_Addr>:8111.

  ![image](https://github.com/user-attachments/assets/36ef19e0-90cf-4889-84ef-26588a49542c)

- Follow the setup wizard to configure your TeamCity server. Select the Default Database, which is a local DataBase.
  
  ![image](https://github.com/user-attachments/assets/262f2f9b-be92-49be-bb55-1def6e427088)

#### Create a New Project:

- In the TeamCity web interface, click "+" adjacent to Projects.

  ![Pasted Graphic 3](https://github.com/user-attachments/assets/334ef1eb-d8a8-425d-afc0-3584e296fd65)

- Provide the Project Name, Build configuration name & Repository details.

  ![Pasted Graphic 20](https://github.com/user-attachments/assets/a5d69eb4-c335-4cad-913d-edfac3bb806f)

- Verify GitHub Repository Access.
  ![image](https://github.com/user-attachments/assets/ed027759-5b5a-486f-b528-9142ed069884)

- Once you click "Proceed", you will be redirected to the build configuration Page.
- Now click "configure build steps manually" and proceed to configure the build steps.
  
  ![Pasted Graphic 3](https://github.com/user-attachments/assets/8e8c0de8-b999-42af-8cae-4c9b2375c36f)

### Step 🤟🏻: Configure Build Steps

#### Add Build Steps:

- For the "Build Image" build step select runner type Docker.

  ![Pasted Graphic 6](https://github.com/user-attachments/assets/bda429f2-d3ee-49ea-a0e3-ad1d90edafc0)

- Configure the build step as shown in the below image.

  ![Pasted Graphic 8](https://github.com/user-attachments/assets/0e834a40-7326-4c7c-82d0-36890f6972c6)

  Note: In the "Image name:tag" field you need to provide <dockerhub_username>/<registry_name>:teamcity-%build.number%

- For the "Push Image" build step, click "Add build step" and select runner type Docker.

  ![image](https://github.com/user-attachments/assets/d6420389-5f0a-4d6f-9c84-acfb9384f8e9)

- Configure the build step as shown in the below image.

  ![Pasted Graphic 25](https://github.com/user-attachments/assets/b90809d3-64b0-4006-8e52-1b675beb4f6c)

- Now you will see both build steps configured.

  ![Pasted Graphic 27](https://github.com/user-attachments/assets/9b009c78-d1c9-4318-9e5f-51d5c2fc9089)
  

### Step 🖐🏻-☝🏻: Connect the DockerHub account to TeamCity

#### Connect the DockerHub account to Project

- Navigate to the Home page, Click on Project name that we have created. Click "Edit Project" and select "Connections".

  ![Pasted Graphic 11](https://github.com/user-attachments/assets/2a13fddb-4b89-48c3-af05-8a23080e7d66)

- Now click "Add Connection", choose "Docker Registry" as the Connection type and provide DockerHub credentials.

  ![Pasted Graphic 12](https://github.com/user-attachments/assets/5f720291-0c02-4672-972e-5211690ed8c2)

- You can test the Connection, to verify that TeamCity can access the DockerHub account.

  ![Pasted Graphic 13](https://github.com/user-attachments/assets/8f73f253-b081-405c-9cab-da8f08bce177)

#### Link Docker registry connection to Build Configuration

- Navigate to the build configuration page. In the Build Features tab link the DockerHub Connection.

  ![Pasted Graphic 14](https://github.com/user-attachments/assets/fe048cd5-a25e-407a-ba10-a2be16fc50ae)

### Step 🖐🏻: Agents configuration

#### Authorize Agents

- Navigate to the Agents page and authorize the required agents (the containers that we ran in Step 1).

  ![Pasted Graphic 19](https://github.com/user-attachments/assets/076e5338-70d0-4a2d-bcfd-a593cbcee362)

#### Check Compatability for the Build

- Navigate to the Build Page and select the "Compatible Agents" tab.

  ![Pasted Graphic 23](https://github.com/user-attachments/assets/7100050f-32bd-4f3e-bece-71471f45cb39)

  We have identified only one agent that is compatible with running our build. Our build requires docker on the agents, and based on our initial setup, only one agent has docker running.

### Step 🖐🏻+☝🏻: Trigger a Build

#### Set Up Triggers:

- Go to the "Triggers" tab in your build configuration.

  ![Pasted Graphic 32](https://github.com/user-attachments/assets/ef4c0e11-8949-4fd7-bd62-96735a45ce5e)

- Add a new trigger (e.g., VCS Trigger) to start a build on code changes. For this project, I am leaving it as default.

#### Run the Build:

- Manually trigger the build by clicking "Run".

  ![Pasted Graphic 28](https://github.com/user-attachments/assets/c1481882-459a-4542-a4e4-e1ab62988266)
  ![Pasted Graphic 29](https://github.com/user-attachments/assets/74fb3f1a-3c29-474c-9204-cdff57acf4c9)

### Step 🖐🏻+✌🏻: Verify the Build

#### Check Build Status:

- Monitor the build progress in the TeamCity web interface.

  ![Pasted Graphic 33](https://github.com/user-attachments/assets/3bceb591-fb1e-4638-91ec-cfa0158125d9)

- Verify that the Docker image is built and pushed to Docker Hub successfully.

  ![Pasted Graphic 34](https://github.com/user-attachments/assets/783fdf52-b2a6-4ed7-ab70-ffd6747b9048)


#### Verify Docker Hub:

- Log in to your Docker Hub account.
- Check if the new Docker image appears in your repository.

  ![Pasted Graphic 30](https://github.com/user-attachments/assets/49a5fdd6-78a4-4e86-9313-f1ab251ea7f0)

## 🙌🏻 Thanks
Thank you for using this guide to get started with TeamCity. We hope this documentation has been helpful in setting up your CI/CD pipeline and automating your build and deployment processes. TeamCity is a powerful tool that can significantly enhance your development workflow, and we are excited to see how it will help you achieve your project's goals.

If you have any questions or need further assistance, please don't hesitate to reach out [**Email**](mailto:karthiksaladidevops@outlook.com). Your feedback is valuable to us, and we are here to support you in your continuous integration and deployment journey.

Happy building and deploying!

Best regards,
<p>Karthik Saladi</p>

