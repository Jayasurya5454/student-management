provider "aws" {
  region = "eu-north-1" 
}


variable "ecr_repo_name" {
  default = "jayasurya"
}

data "aws_ecr_repository" "existing_repo" {
  name = var.ecr_repo_name
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role_policy.json
}

data "aws_iam_policy_document" "ecs_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_cluster" "my_cluster" {
  name = "my-ecs-cluster"
}

resource "aws_ecs_task_definition" "my_task_definition" {
  family                   = "my-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                      = "256" 
  memory                   = "512" 

  container_definitions = jsonencode([
    {
      name  = "my-app-container"
      image = "${data.aws_ecr_repository.existing_repo.repository_url}:latest" 
      cpu   = 256
      memory = 512
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "my_service" {
  name            = "my-ecs-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.my_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = ["10.0.1.0/24", "10.0.2.0/24"] 
    security_groups = [aws_security_group.ecs_service_sg.id]
    assign_public_ip = true
  }
}

resource "aws_security_group" "ecs_service_sg" {
  name        = "ecs-service-sg"
  description = "Allow HTTP traffic to ECS service"
  vpc_id      = "vpc-0379e3742a58ee9e7" 

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.my_cluster.name
}

output "ecs_service_name" {
  value = aws_ecs_service.my_service.name
}

output "ecr_repository_url" {
  value = data.aws_ecr_repository.existing_repo.repository_url
}
