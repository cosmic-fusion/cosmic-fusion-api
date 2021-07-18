resource "aws_security_group" "cosmic_fusion_rds" {
  name        = "${var.env}-cosmic-fusion-db-sg"
  description = "RDS traffic"
  vpc_id      = "vpc-bdcc74d4"

  ingress {
    protocol    = "tcp"
    from_port   = 3306
    to_port     = 3306
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.env}-cosmic-fusion-db-sg"
    Generator   = "Terraform"
    Environment = var.env
  }
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "3.3.0"

  identifier             = "${var.env}-cosmic-fusion"
  name                   = "${var.env}_cosmic_fusion_db"
  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = 20
  storage_encrypted      = false
  major_engine_version   = var.engine_version
  publicly_accessible    = true
  username               = var.username
  password               = var.password
  port                   = var.port
  vpc_security_group_ids = [aws_security_group.cosmic_fusion_rds.id]
  maintenance_window     = var.maintenance_window
  backup_window          = var.backup_window
  # disable backups to create DB faster
  backup_retention_period = 0

  # enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  subnet_ids = var.subnet_ids

  # DB parameter group
  family = var.db_family

  # Snapshot name upon DB deletion
  final_snapshot_identifier = "${var.env}-cosmic-fusion-final-snapshot"

  # Database Deletion Protection
  deletion_protection = false

  tags = {
    Name      = "${var.env}-cosmic-fusion-db"
    Generated = "True"
    Generator = "Terraform"
  }
}