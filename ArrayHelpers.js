function arrayEquals( arr1, arr2 ){
	if( !Array.isArray( arr1 ) || !Array.isArray( arr2 ) ){
		return false;
	}
	if( arr1.length !== arr2.length ){
		return false;
	}
	return arr1.every( (val, i ) => val === arr2[ i ] );
}

function arrayContains( arr, value ){
	if( Array.isArray( value ) ){
		return arr.findIndex( a => arrayEquals( a, value ) )
	}
	return arr.indexOf( value ) > -1
}

module.exports = {
	arrayEquals,
	arrayContains
}