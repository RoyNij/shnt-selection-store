/**
 *  * This is a simple helper function to keep track of selections within a data viz
 * 
 * Depending on whether a selection key is set (by using opts.key), 
 * it will try to keep track of a selection of objects or simple values
 * 
 * It is just a little helper, because I am sick of rewriting this code in almost any
 * data visualization I create
 * 
 * @param {Object} opts { initialSelection: [], key: undefined }
 */
function isObject( value ){
	if( value !== undefined ){
		if( value !== null ){
			return 'object' === typeof value
		}
	}
	return false
}

function SelectionStore( opts ){
	let selectionKey = opts ? opts.key : undefined;
	const selection = setInitialSelection( opts )
	

	function setInitialSelection( opts ){
		// Deal with undefineds and empty arrays
		if( opts === undefined ){
			return [];
		}
		if( opts.initialSelection === undefined ){
			return [];
		}
		if( !Array.isArray( opts.initialSelection ) ){
			console.warn( "WARNING: You are trying to setup an initial selection that is not in the form of an array")
			return [];
		}
		if( opts.initialSelection.length < 1 ){
			return [];
		}

		// If we are dealing with objects in the initial selection
		if( isObject( opts.initialSelection[ 0 ] ) ){
			if( opts.key === undefined){
				throw new Error( "ERROR: Cannot initialize a selection of objects without idetifying key" );
			}
			
			// Filter out initial selections without the required key
			return opts.initialSelection
				.filter( s => {
					if( s[ selectionKey ] === undefined ){
						console.warn( "WARNING: Some members of your initial selection do not have the required key and will be ignored")
					}
					return s[ selectionKey ] !== undefined
				} )
				.map( s => s[ selectionKey ] );
		} else {
			// If we are dealing  with a simple array that should be returned
			return opts.initialSelection;
		}
	}

	function checkValue( value ){
		if( selectionKey !== undefined && !isObject( value ) ){
			throw new Error( "This comparison expects an object as a value, a simple number or string was given" )
		}
		if( selectionKey === undefined && isObject( value ) ){
			throw new Error( "This comparison expects a simple string or number, but an object was given. If you're working with objects set a key.")
		}
	}

	values.key = ( new_key ) => {
		if( arguments.length <  1 || new_key === undefined){
			return selectionKey
		}
		selectionKey = new_key;
		return values;
	}

	/**
	 * Function to get  Sthe pontential index of a value given to it
	 * @param { Number|String|Object } value 
	 */
	values.getIndex = ( value ) => {
		if( selectionKey === undefined ){
			return selection.indexOf( value )
		}
		return selection.findIndex( s => {
			return s === value[ selectionKey ]
		});
	}
	
	/**
	 * Function to check whether the value is contained in the selection
	 * @param { Number|String|Object } value 
	 */
	values.contains = ( value ) => {
		checkValue( value );
		return values.getIndex( value ) > -1;
	}

	/**
	 * Function to toggle a value in a selection, if it exists it is removed
	 * if it doesn't exist it is added
	 * @param { Number|String|Object } value 
	 */
	values.toggle = ( value ) => {
		if( values.contains( value ) ){
			selection.splice( selection.getIndex( value ), 1 );
		} else {
			isObject( value ) ? selection.push( value[ selectionKey ] ) : selection.push( value );
		}
	}

	/**
	 * Function to add a value to the selection, it will avoid duplicates
	 * in the selection
	 * @param { Number|String|Object } value 
	 */
	values.add = ( value ) => {
		if( !values.contains( value ) ){
			isObject( value ) ? selection.push( value[ selectionKey ] ) : selection.push( value )
		}
	}

	/**
	 * Function to remove a value from the section, will only do so if the
	 * value exists in the selection
	 * 
	 * @param { Number|String|Object } value 
	 */
	values.remove = ( value ) => {
		if( values.contains( value ) ){
			selection.splice( values.getIndex( value ), 1 );
		}
	}

	/**
	 * Function to empty the selection
	 */
	values.empty = () => {
		selection.splice( 0, selection.length )
	}

	/**
	 * Function to check if the selection is empty
	 */
	values.isEmpty = () => {
		return selection.length < 1
	}

	/**
	 * Returns the values within the selection
	 */
	function values(){
		return selection;
	}

	return values
}

module.exports = SelectionStore;
