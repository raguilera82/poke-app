import { ZodError, type ZodType } from "zod";

export type ValidationResult<T> = {
	success: boolean;
	data?: T;
	errors?: ValidationErrors;
};

export type ValidationErrors = Record<string, string[]>;

export class ValidationError extends Error {
	constructor(
		message: string,
		public readonly errors: ValidationErrors,
	) {
		super(message);
		this.name = "ValidationError";
	}
}

class ValidationHelper {
	getErrorMessages(error: ValidationError): string[] {
		const messages: string[] = [];

		Object.values(error.errors).forEach((fieldErrors) => {
			messages.push(...fieldErrors);
		});

		return messages;
	}

	check<T>(schema: ZodType<T>, data: unknown): ValidationResult<T> {
		try {
			const result = schema.parse(data);
			return {
				success: true,
				data: result,
				errors: undefined,
			};
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = this.formatZodError(error);
				return {
					success: false,
					data: undefined,
					errors: errors,
				};
			}
			throw error;
		}
	}

	private formatZodError(error: ZodError): ValidationErrors {
		const errors: ValidationErrors = {};

		error.errors.forEach((err) => {
			const field = err.path.join(".") || "unknown";
			if (!errors[field]) {
				errors[field] = [];
			}
			errors[field].push(err.message);
		});

		return errors;
	}
}

export const validation = new ValidationHelper();
