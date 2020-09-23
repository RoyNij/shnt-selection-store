function arrayEquals( arr1, arr2 ){
	if( !Array.isArray( arr1 ) || !Array.isArray( arr2 ) ){
		return false;
	}
	if( arr1.length !== arr2.length ){
		return false;
	}

	if( arr1.indexOf( undefined ) > -1 || arr1.indexOf( null ) > -1 ){
		return arrayPartiallyEquals( arr1, arr2 );
	}

	return arr1.every( (val, i ) => {
		return val === arr2[ i ] 
	});
}

function arrayPartiallyEquals( arr1, arr2 ){
	return arr1.some( ( _, i ) => arr1[ i ] === arr2[ i ])
}

function arrayContains( arr, value ){
	if( Array.isArray( value ) ){
		return arr.findIndex( a => arrayEquals( a, value ) ) > -1
	}
	
	return arr.indexOf( value ) > -1
}

module.exports = {
	arrayEquals,
	arrayPartiallyEquals,
	arrayContains
}