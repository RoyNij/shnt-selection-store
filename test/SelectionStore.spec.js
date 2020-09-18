const SelectionStore = require( '../SelectionStore' );
const expect = require( 'chai' ).expect;

// Global setup
const initialSelection = ["a", "b", "c"];
const initialNumericSelection = [ 1, 2, 3 ];
const initialObjectSelection = [
	{
		'ID': 1
	},
	{
		'ID': 2
	},
	{
		'ID': 3
	}
]

describe( 'Initialization', () =>  {
	it( "Should be able to initialize with an empty opts setup", () => {
		let test = new SelectionStore( {} )

		expect( test() ).to.be.an( 'array' ).with.lengthOf( 0 );
		expect( test.key() ).to.be.undefined;
	} )

	it( "Should be able to initialize with undefined opts setup", () => {
		let test = new SelectionStore( )

		expect( test() ).to.be.an( 'array' ).with.lengthOf( 0 );
		expect( test.key() ).to.be.undefined;
	})

	it( "Should be able to initialize with just a key in opts setup", () => {
		let test = new SelectionStore( { key: 'ID' } )

		expect( test() ).to.be.an( 'array' ).with.lengthOf( 0 );
		expect( test.key() ).to.equal( 'ID' );
	})

	it( "Should be able to initialze with an initial selection", () => {
		let test = new SelectionStore( {key: 'ID', initialSelection } )

		expect( test() )
			.to.be.an( 'array' )
			.with.lengthOf( 3 )
			.and.to.deep.equal( initialSelection );
	})
} )

describe( "Setup change", () => {
	it( "Should be able to change the key value", () => {
		let test = new SelectionStore( { key: 'ID' } );

		test.key( 'id' );

		expect( test.key() ).to.equal( 'id' );
	})

	it( "Should be able to empty the selection", () => {
		let test =  new SelectionStore( {key: 'ID' }, initialSelection )

		test.empty();

		expect( test() ).to.be.an( 'array' ).with.lengthOf( 0 );
	})
} )

describe( "Checks", () => {
	it( "Should show that an empty selection is empty", () => {
		let test = new SelectionStore( {key : 'ID'} );

		expect( test.isEmpty() ).to.be.a( 'boolean' ).and.equal( true );
	})

	it( "Should show that a non-empty selection is not empty", () => {
		let test = new SelectionStore( {key : 'ID', initialSelection } );

		expect( test.isEmpty() ).to.be.a( 'boolean' ).and.equal( false );
	})

	describe( "Simple values", () => {
		it( "Should find an existing value from simple string value", () => {
			let test = new SelectionStore( { initialSelection } );
	
			expect( test.contains( 'a' ) ).to.be.a( 'boolean' ).and.equal( true )
		})
	
		it( "Should not find an existing value from simple string value", () => {
			let test = new SelectionStore( { initialSelection } );
	
			expect( test.contains( 'z' ) ).to.be.a( 'boolean' ).and.equal( false )
		})

		it( "Should find an existing value from simple numeric value", () => {
			let test = new SelectionStore( { initialSelection: initialNumericSelection } );
	
			expect( test.contains( 1 ) ).to.be.a( 'boolean' ).and.equal( true )
		})

		it( "Should not find an existing value from simple numeric value", () => {
			let test = new SelectionStore( { initialSelection: initialNumericSelection } );
	
			expect( test.contains( 99 ) ).to.be.a( 'boolean' ).and.equal( false )
		})
	} )

	describe( "Object values", () => {
		it( "Should find an existing value based on its key", () => {
			let test = new SelectionStore( {key: 'ID', initialSelection: initialObjectSelection } )
			expect( test.contains( {'ID': 1 } ) ).to.be.a( 'boolean' ).and.equal( true );
		})

		it( "Should not find a non-existing value based on its key", () => {
			let test = new SelectionStore( {key: 'ID', initialSelection: initialObjectSelection } )
			expect( test.contains( {'ID': 99 } ) ).to.be.a( 'boolean' ).and.equal( false );
		})
	} )
})

describe( "Error Handling", () => {
	it( "Should throw an error when you are trying to setup initial seleciton of objects without setting up a key", () => {
		let test = () => new SelectionStore( { initialSelection: initialObjectSelection } ) 
		expect( test ).to.throw( 'ERROR:')
	} )

	it( "Should warn you when initializing with initial selection that is not in the form of an array and ignore it", () => {
		let test = new SelectionStore( { key: 'ID', initialSelection: null } )
		expect( test() ).to.be.an('array').with.lengthOf( 0 );
	} )

	it( "Should warn you that some of your initial selection does not have the required key and skip those", () => {
		let initialSelection = [ {"id": 1}, {"ID": 2 }, {"id": 3 } ];
		let test = new SelectionStore( { key: 'id', initialSelection } )

		expect( test() ).to.be.an('array').with.lengthOf( 2 )
	})

	it( "Should throw an error when comparing a simple string/number when a key is set", () => {
		let test = new SelectionStore( { key: 'ID' } )
		expect( () => { test.contains( 1 ) } ).to.throw()
	})

	it( "Should throw an error when comparing an object but no key was set", () => {
		let test = new SelectionStore();
		expect( () => { test.contains( {ID: 1} ) } ).to.throw();
	})
})