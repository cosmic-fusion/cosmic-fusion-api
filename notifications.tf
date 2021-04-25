# SNS

module "sns_platform_application" {
  source   = "./modules/sns_platform_application"
  name     = "${var.env}_${var.platform_name}"
  platform = var.platform
  api_key  = var.api_key
}

# Lambda

module "send_notification_lambda" {
  source                 = "./modules/lambda"
  lambda_zip_file        = "${var.env}SendNotification.zip"
  function_name          = "${var.env}SendDailyNotification"
  handler                = "sendDailyNotification.handler"
  runtime                = "nodejs12.x"
  rest_api_execution_arn = module.cosmic_fusion_api.execution_arn
  lambda_bucket          = var.lambda_bucket
  env                    = var.env
  DATABASE_HOST          = trimsuffix(module.rds.endpoint, ":${var.port}")
}

# CloudWatch

module "daily_cloudwatch_schedule" {
  source              = "./modules/cloudwatch"
  name                = "${var.env}-daily-mantra-notification"
  description         = "Fires a daily mantra notification to users every day"
  schedule_expression = "0 8 * * *"
  lambda_function_arn = module.send_notification_lambda.arn
  function_name       = module.send_notification_lambda.function_name
}