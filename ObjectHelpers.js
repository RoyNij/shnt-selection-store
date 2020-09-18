function isObject( value ){
	if( value !== undefined ){
		if( value !== null ){
			return 'object' === typeof value && !Array.isArray( value );
		}
	}
	return false
}

function getValueFromKey( object, key ){
	const keys = key.split(".");
	
	if( keys.length < 2 ){
		return object[ key ];
	} else {
		key = keys.shift();
		return getValueFromKey( object[ key ], keys.join(".") );
	}
}

module.exports = {
	isObject,
	getValueFromKey
}