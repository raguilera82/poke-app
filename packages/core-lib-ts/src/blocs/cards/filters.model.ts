import { z } from "zod";
import { validate } from "../../helpers/validation";

const FiltersSchema = z.object({
	byName: z.string().min(3, {
		message: "Name must be at least 3 character long",
	}),
});
type FiltersType = z.infer<typeof FiltersSchema>;

export class Filters {
	readonly byName: string | null;

	private constructor(filters: FiltersType) {
		this.byName = filters.byName;
	}

	static create(filters: FiltersType): Filters {
		const parsedFilters = validate(FiltersSchema, filters);
		return new Filters(parsedFilters);
	}
}
