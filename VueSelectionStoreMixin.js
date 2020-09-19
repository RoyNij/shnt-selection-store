const { arrayEquals } = require("./ArrayHelpers")

const SelectionStoreMixin = {
	data: function(){
		return {
			selectionStore: []
		}
	},
	computed: {
		selectionIsEmpty(){
			return this.selectionStore.length < 1
		}
	},
	methods: {
		toggleInSelection( value ){
			if( this.selectionContains( value ) ){
				this.removeFromSelection( value )
			} else {
				this.addToSelection( value )
			}
		},
		addToSelection( value ){
			if( !this.selectionContains( value ) ){
				this.selectionStore.push( value )
			}
		},
		removeFromSelection( value ){
			if( this.selectionContains( value ) ){
				this.selectionStore.splice( this.getIndexInSelection( value ), 1 );
			}
		},
		getIndexInSelection( value ){
			if( Array.isArray( value ) ){
				return this.selectionStore
					.findIndex( s => arrayEquals( s, value ) )
			}
			return this.selectionStore.indexOf( value )
		},
		selectionContains( value ){
			return this.getIndexInSelection( value ) > -1
		},
		emptySelection(){
			this.selectionStore = []
		}
	}
}

module.exports = SelectionStoreMixin