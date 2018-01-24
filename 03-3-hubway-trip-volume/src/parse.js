export default function(d){
	return {
		t0: new Date(d.start_date),
		t1: new Date(d.end_date),
		station0: d.strt_statn,
		station1: d.end_statn,
		duration: +d.duration,
		bike_nr: d.bike_nr,
		subsc_type: d.subsc_type
	}
}