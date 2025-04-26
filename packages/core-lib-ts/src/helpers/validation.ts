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

export function validate<T>(schema: ZodType<T>, data: unknown): T {
	try {
		return schema.parse(data);
	} catch (error) {
		if (error instanceof ZodError) {
			const errors = formatZodError(error);
			throw new ValidationError("Validation failed", errors);
		}
		throw error;
	}
}
function formatZodError(error: ZodError): ValidationErrors {
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
