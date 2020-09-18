function arrayEquals( arr1, arr2 ){
	if( !Array.isArray( arr1 ) || !Array.isArray( arr2 ) ){
		return false;
	}
	if( arr1.length !== arr2.length ){
		return false;
	}
	return arr1.every( (val, i ) => val === arr2[ i ] );
}

module.exports = {
	arrayEquals,
}