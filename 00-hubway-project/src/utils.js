export const parse = d => {
	const t0 = new Date(d.start_date);
	const t1 = new Date(d.end_date);

	return {
		t0: t0,
		t1: t1,
		time_of_day0: t0.getHours() + t0.getMinutes()/60,
		time_of_day1: t1.getHours() + t1.getHours()/60,
		station0: d.strt_statn,
		station1: d.end_statn,
		duration: +d.duration,
		bike_nr: d.bike_nr,
		subsc_type: d.subsc_type
	};
}