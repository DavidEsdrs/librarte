import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint()
export class IsBeforeNowConstraint implements ValidatorConstraintInterface {
  validate(date: number) {
    return date <= new Date().getFullYear()
  }

  defaultMessage(args: ValidationArguments) {
    return `Date ${args.property} has to be equals or less than current year.`
  }
}

export function IsBeforeNow(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsBeforeNowConstraint,
    })
  }
}
