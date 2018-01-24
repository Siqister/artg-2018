function parse(d){
	return {
		country:d.Country,
		count_1900: +d['1900'],
		count_1960: +d['1960'],
		count_2012: +d['2012']
	}
}

export {parse};