import { z } from "zod";
import {
	type ValidationResult,
	validation,
} from "../../helpers/validation.helper";

const FiltersSchema = z.object({
	byName: z.string().min(3, {
		message: "Name must be at least 3 character long",
	}),
});
type FiltersType = z.infer<typeof FiltersSchema>;

export class Filters {
	readonly byName?: string | null;

	private constructor(filters: FiltersType) {
		this.byName = filters.byName;
	}

	static create(filters: FiltersType): ValidationResult<Filters> {
		return validation.check(FiltersSchema, filters);
	}
}
