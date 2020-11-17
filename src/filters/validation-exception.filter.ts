import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { CustomValidationException } from '../exceptions/validation.exception';
import { FailedResponseDTO } from '../shared/dto/failed-response.dto';

@Catch(CustomValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: CustomValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const resp: FailedResponseDTO = {
      errorMessage: exception.message,
      errors: exception.validationErrors,
    };

    response.status(status).json(resp);
  }
}
