import {suite,it,TestContext} from 'node:test';
import assert from 'node:assert/strict';
import {BBPacker} from "../../dist/BBPacker.js"



function toBigInt( value : { hi : number , lo : number  }  ) : bigint
{
  const _hi : bigint = BigInt(value.hi);
  const _lo : bigint = BigInt(value.lo);
  return (_hi << 32n) | _lo;
}

function fromBigInt(  value : bigint   ) : { hi : number , lo : number  }
{
  let rc = { hi : 0 , lo : 0  };
  rc.lo = Number( BigInt.asUintN(32, value) );
  rc.hi = Number( BigInt.asUintN(32, value >> 32n) );
  return rc;
}


export async function tst4()
{
    


  it('ReadWriteU64', async (ctx) => {
    

      await ctx.test( "writeU64" , () =>{

      let packer = new  BBPacker( 8 , {littleEndian : true} );         

       packer.writeU64( 0 ,  fromBigInt( 0x11_22_33_44_55_66_77_88n ) ); 

       if( packer.readU8(0) != 0x88 )  
       {
         throw new Error("packer.readU8(0) != 0x88");
       } 

       if( packer.readU8(1) != 0x77 )  
       {
         throw new Error("packer.readU8(1) != 0x77");
       } 

       if( packer.readU8(2) != 0x66 )  
       {
         throw new Error("packer.readU8(2) != 0x66");
       } 

       if( packer.readU8(3) != 0x55 )  
       {
         throw new Error("packer.readU8(3) != 0x55");
       } 

       if( packer.readU8(4) != 0x44 )  
       {
         throw new Error("packer.readU8(4) != 0x44");
       } 

       if( packer.readU8(5) != 0x33 )  
       {
         throw new Error("packer.readU8(5) != 0x33");
       } 

       if( packer.readU8(6) != 0x22 )  
       {
         throw new Error("packer.readU8(6) != 0x22");
       } 

       if( packer.readU8(7) != 0x11 )  
       {
         throw new Error("packer.readU8(7) != 0x11");
       } 



     
       packer.writeU64( 0 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) , false ); 


       if( packer.readU8(0) != 0x11 )  
       {
         throw new Error("packer.readU8(0) != 0x11");
       } 

       if( packer.readU8(1) != 0x22 )  
       {
         throw new Error("packer.readU8(1) != 0x22");
       } 

       if( packer.readU8(2) != 0x33 )  
       {
         throw new Error("packer.readU8(2) != 0x33");
       } 

       if( packer.readU8(3) != 0x44 )  
       {
         throw new Error("packer.readU8(3) != 0x44");
       } 

       if( packer.readU8(4) != 0x55 )  
       {
         throw new Error("packer.readU8(4) != 0x55");
       } 

       if( packer.readU8(5) != 0x66 )  
       {
         throw new Error("packer.readU8(5) != 0x66");
       } 

       if( packer.readU8(6) != 0x77 )  
       {
         throw new Error("packer.readU8(6) != 0x77");
       } 

       if( packer.readU8(7) != 0x88 )  
       {
         throw new Error("packer.readU8(7) != 0x88");
       } 





       packer = new  BBPacker( 8 , {littleEndian : false} );         

       packer.writeU64( 0 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) ); 

       if( packer.readU8(0) != 0x11 )  
       {
         throw new Error("packer.readU8(0) != 0x11");
       } 

       if( packer.readU8(1) != 0x22 )  
       {
         throw new Error("packer.readU8(1) != 0x22");
       } 

       if( packer.readU8(2) != 0x33 )  
       {
         throw new Error("packer.readU8(2) != 0x33");
       } 

       if( packer.readU8(3) != 0x44 )  
       {
         throw new Error("packer.readU8(3) != 0x44");
       } 

       if( packer.readU8(4) != 0x55 )  
       {
         throw new Error("packer.readU8(4) != 0x55");
       } 

       if( packer.readU8(5) != 0x66 )  
       {
         throw new Error("packer.readU8(5) != 0x66");
       } 

       if( packer.readU8(6) != 0x77 )  
       {
         throw new Error("packer.readU8(6) != 0x77");
       } 

       if( packer.readU8(7) != 0x88 )  
       {
         throw new Error("packer.readU8(7) != 0x88");
       } 



       packer.writeU64( 0 ,  fromBigInt( 0x11_22_33_44_55_66_77_88n ) , true ); 



      if( packer.readU8(0) != 0x88 )  
       {
         throw new Error("packer.readU8(0) != 0x88");
       } 

       if( packer.readU8(1) != 0x77 )  
       {
         throw new Error("packer.readU8(1) != 0x77");
       } 

       if( packer.readU8(2) != 0x66 )  
       {
         throw new Error("packer.readU8(2) != 0x66");
       } 

       if( packer.readU8(3) != 0x55 )  
       {
         throw new Error("packer.readU8(3) != 0x55");
       } 

       if( packer.readU8(4) != 0x44 )  
       {
         throw new Error("packer.readU8(4) != 0x44");
       } 

       if( packer.readU8(5) != 0x33 )  
       {
         throw new Error("packer.readU8(5) != 0x33");
       } 

       if( packer.readU8(6) != 0x22 )  
       {
         throw new Error("packer.readU8(6) != 0x22");
       } 

       if( packer.readU8(7) != 0x11 )  
       {
         throw new Error("packer.readU8(7) != 0x11");
       } 


       assert.throws( () => {    
            packer.writeU64( 1 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) );
  
         } , () => true , "packer.writeU64( 1 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) );" );



          return assert.ok(true); 
      });  


      await ctx.test( "readU64" , () =>{

      let packer = new  BBPacker( 8 , {littleEndian : true} );         

       packer.writeU64( 0 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) ); 


       if(  toBigInt(packer.readU64(0))  != 0x11_22_33_44_55_66_77_88n )
       {
         throw new Error("toBigInt(packer.readU64(0))  != 0x11_22_33_44_55_66_77_88n");
       }  

       if( toBigInt(packer.readU64(0,false))  != 0x88_77_66_55_44_33_22_11n)
       {
         throw new Error("toBigInt(packer.readU64(0,false))  != 0x88_77_66_55_44_33_22_11n");
       }  


       assert.throws( () => {    
           packer.readU64( 1 );
  
         } , () => true , "packer.readU64( 1 );" );


          return assert.ok(true); 
      });  

      
      await ctx.test( "writeArrU64,readArrU64" , () =>{

      let packer = new  BBPacker( 17 , {littleEndian : true} );         


      packer.writeArrU64( 0 ,  [ fromBigInt( 0x11_22_33_44_55_66_77_88n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] ); 

       assert.throws( () => {    
           packer.writeArrU64( 2 ,  [ fromBigInt( 0x00_00_33_44_55_66_77_88n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] );
  
         } , () => true , "packer.writeArrU64( 2 ,  [ fromBigInt( 0x00_00_33_44_55_66_77_88n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] );" );

       assert.throws( () => {    
           packer.writeArrU64( 0 ,  [ fromBigInt( 0x11_aa_33_44_55_66_77_88n )  , fromBigInt( 0x01_bb_03_04_05_06_07_08n ) , fromBigInt( 0x01_cc_03_04_05_06_07_08n )  ] );
  
         } , () => true , "packer.writeArrU64( 0 ,  [ fromBigInt( 0x11_aa_33_44_55_66_77_88n )  , fromBigInt( 0x01_bb_03_04_05_06_07_08n ) , fromBigInt( 0x01_cc_03_04_05_06_07_08n )  ] );" );


     assert.throws( () => {    
           packer.readArrU64( 0 ,  3 );
  
         } , () => true , "packer.readArrU64( 0 ,  3 );" );
  
     assert.throws( () => {    
           packer.readArrU64( 17 );
  
         } , () => true , "packer.readArrU64( 17 );" );


 


      const arr1 = packer.readArrU64(0);

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

    

      if( toBigInt(arr1[0])   != 0x11_22_33_44_55_66_77_88n )
      {
         throw new Error("toBigInt(arr1[0])   != 0x11_22_33_44_55_66_77_88n");
      }  

      if( toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n )
      {
         throw new Error("toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n");
      }  

      const arr2 = packer.readArrU64(0,1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_88n )
      {
         throw new Error("toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_88n");
      }  

       
      const arr3 = packer.readArrU64(0,false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

 

      if( toBigInt(arr3[0]) !=  0x88_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr3[0]) !=  0x88_77_66_55_44_33_22_11n");
      }  

      if( toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n )
      {
         throw new Error("toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n");
      }  


      const arr4 =  packer.readArrU64(0,1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( toBigInt(arr4[0]) != 0x88_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr4[0]) != 0x88_77_66_55_44_33_22_11n");
      }  

      packer.writeArrU64( 0 ,  [ fromBigInt( 0x11_22_33_44_55_66_77_88n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] , false );

      const arr5 =  packer.readArrU64(0,1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( toBigInt(arr5[0]) != 0x88_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr5[0]) != 0x88_77_66_55_44_33_22_11n");
      }  



          return assert.ok(true); 
      });  



      await ctx.test( "putU64,getU64" , () =>{

      let packer = new  BBPacker( 16 , {littleEndian : true} );         

         


       packer.putU64( fromBigInt( 0x11_22_33_44_55_66_77_88n ) ); 
       packer.putU64( fromBigInt( 0x01_02_03_04_05_06_07_08n ) ); 


       packer.resetIndex();


       if( toBigInt(packer.getU64()) != 0x11_22_33_44_55_66_77_88n )
       {
         throw new Error(" toBigInt(packer.getU64()) != 0x11_22_33_44_55_66_77_88n");
       }  

       if( toBigInt(packer.getU64()) != 0x01_02_03_04_05_06_07_08n )
       {
         throw new Error("toBigInt(packer.getU64()) != 0x01_02_03_04_05_06_07_08n");
       }  

       packer.resetIndex();

       packer.putU64(fromBigInt( 0x11_22_33_44_55_66_77_88n ) , false ); 
       packer.putU64(fromBigInt( 0x01_02_03_04_05_06_07_08n ) , false ); 

       packer.resetIndex();

       if( toBigInt(packer.getU64()) != 0x88_77_66_55_44_33_22_11n )
       {
         throw new Error("toBigInt(packer.getU64()) != 0x88_77_66_55_44_33_22_11n");
       }  

       if( toBigInt(packer.getU64()) != 0x08_07_06_05_04_03_02_01n )
       {
         throw new Error("toBigInt(packer.getU64()) != 0x08_07_06_05_04_03_02_01n");
       }  


       packer.resetIndex();

       packer.putU64( fromBigInt( 0x11_22_33_44_55_66_77_88n )  ); 
       packer.putU64( fromBigInt( 0x01_02_03_04_05_06_07_08n )  ); 


       packer.resetIndex();

       if( toBigInt(packer.getU64(false)) != 0x88_77_66_55_44_33_22_11n)
       {
         throw new Error("toBigInt(packer.getU64(false)) != 0x88_77_66_55_44_33_22_11n");
       }  

       if(toBigInt(packer.getU64(false)) != 0x08_07_06_05_04_03_02_01n )
       {
         throw new Error("toBigInt(packer.getU64(false)) != 0x08_07_06_05_04_03_02_01n");
       }  

    assert.throws( () => {    
           packer.putU64( fromBigInt( 0x11_22_33_44_55_66_77_88n )  );
  
         } , () => true , "packer.putU64( fromBigInt( 0x11_22_33_44_55_66_77_88n )  );" );

    assert.throws( () => {    
           packer.getU64(  );
  
         } , () => true , "packer.getU64(  );" );




          return assert.ok(true); 
      });  


     await ctx.test( "putArrU64,getArrU64" , () =>{

      let packer = new  BBPacker( 17 , {littleEndian : true} );         

      packer.putArrU64(  [ fromBigInt( 0x11_22_33_44_55_66_77_88n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] ); 

    assert.throws( () => {    
           packer.putArrU64( [ fromBigInt( 0x00_00_00_00_00_00_00_00n ) ] );
  
         } , () => true , "packer.putArrU64( [ fromBigInt( 0x00_00_00_00_00_00_00_00n ) ] );" );

    assert.throws( () => {    
           packer.getArrU64( );
  
         } , () => true , "packer.getArrU64( );" );




      packer.resetIndex();


      const arr1 = packer.getArrU64();

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( toBigInt(arr1[0]) != 0x11_22_33_44_55_66_77_88n )
      {
         throw new Error("toBigInt(arr1[0]) != 0x11_22_33_44_55_66_77_88n");
      }  

      if( toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n )
      {
         throw new Error("toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n");
      }  

      packer.resetIndex();

      const arr2 = packer.getArrU64(1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_88n )
      {
         throw new Error("toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_88n");
      }  

      packer.resetIndex(); 

      const arr3 = packer.getArrU64(false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( toBigInt(arr3[0]) != 0x88_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr3[0]) != 0x88_77_66_55_44_33_22_11n");
      }  

      if( toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n )  
      {
         throw new Error("toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n");
      }  

      packer.resetIndex(); 


      const arr4 =  packer.getArrU64(1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( toBigInt(arr4[0]) != 0x88_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr4[0]) != 0x88_77_66_55_44_33_22_11n");
      }  

      packer.resetIndex(); 

      packer.putArrU64(  [ fromBigInt( 0x11_22_33_44_55_66_77_88n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] , false );

      packer.resetIndex(); 

      const arr5 =  packer.getArrU64(1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( toBigInt(arr5[0]) !=0x88_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr5[0]) !=0x88_77_66_55_44_33_22_11n");
      }  


          return assert.ok(true); 
      });  


       return assert.ok(true); 
  });

 it('ReadWriteOvfU64', () => {
    
      const packer = new  BBPacker( 8 , {throwAtRangeOverflow:true} );  

      packer.writeU64( 0 , {hi:BBPacker.MAX_UINT64_HI , lo:BBPacker.MAX_UINT64_LO} );
      packer.writeU64( 0 , {hi:BBPacker.MIN_UINT64_HI , lo:BBPacker.MIN_UINT64_LO} );
      packer.writeArrU64( 0 , [ {hi:BBPacker.MAX_UINT64_HI , lo:BBPacker.MAX_UINT64_LO} ]  ); 
      packer.writeArrU64( 0 , [ {hi:BBPacker.MIN_UINT64_HI , lo:BBPacker.MIN_UINT64_LO} ]  ); 

      packer.resetIndex();


      packer.putU64( {hi:BBPacker.MAX_UINT64_HI , lo:BBPacker.MAX_UINT64_LO} );

      packer.resetIndex();

      packer.putU64( {hi:BBPacker.MIN_UINT64_HI , lo:BBPacker.MIN_UINT64_LO} );

      packer.resetIndex();


      packer.putArrU64( [ {hi:BBPacker.MAX_UINT64_HI , lo:BBPacker.MAX_UINT64_LO} ] );
       
      packer.resetIndex();

      packer.putArrU64( [ {hi:BBPacker.MIN_UINT64_HI , lo:BBPacker.MIN_UINT64_LO} ] );

    assert.throws( () => {    
           packer.writeU64( 0 , {hi:BBPacker.MAX_UINT64_HI + 1 , lo:BBPacker.MAX_UINT64_LO} );
  
         } , () => true , "packer.writeU64( 0 , {hi:BBPacker.MAX_UINT64_HI + 1 , lo:BBPacker.MAX_UINT64_LO} );" );

    assert.throws( () => {    
           packer.writeU64( 0 , {hi:BBPacker.MAX_UINT64_HI , lo:BBPacker.MAX_UINT64_LO+1} );
  
         } , () => true , "packer.writeU64( 0 , {hi:BBPacker.MAX_UINT64_HI , lo:BBPacker.MAX_UINT64_LO+1} );" );

    assert.throws( () => {    
           packer.writeU64( 0 , {hi:BBPacker.MIN_UINT64_HI - 1 , lo:BBPacker.MIN_UINT64_LO} );
  
         } , () => true , "packer.writeU64( 0 , {hi:BBPacker.MIN_UINT64_HI - 1 , lo:BBPacker.MIN_UINT64_LO} );" );

   assert.throws( () => {    
           packer.writeU64( 0 , {hi:BBPacker.MIN_UINT64_HI  , lo:BBPacker.MIN_UINT64_LO - 1} );
  
         } , () => true , "packer.writeU64( 0 , {hi:BBPacker.MIN_UINT64_HI  , lo:BBPacker.MIN_UINT64_LO - 1} );" );

 
   assert.throws( () => {    
           packer.writeArrU64( 0 , [  {hi:BBPacker.MAX_UINT64_HI + 1 , lo:BBPacker.MAX_UINT64_LO} ]  );
  
         } , () => true , "packer.writeArrU64( 0 , [  {hi:BBPacker.MAX_UINT64_HI + 1 , lo:BBPacker.MAX_UINT64_LO} ]  );" );

   assert.throws( () => {    
          packer.writeArrU64( 0 , [  {hi:BBPacker.MAX_UINT64_HI  , lo:BBPacker.MAX_UINT64_LO + 1} ]  );
  
         } , () => true , "packer.writeArrU64( 0 , [  {hi:BBPacker.MAX_UINT64_HI  , lo:BBPacker.MAX_UINT64_LO + 1} ]  );" );


   assert.throws( () => {    
          packer.writeArrU64( 0 , [ {hi:BBPacker.MIN_UINT64_HI - 1  , lo:BBPacker.MIN_UINT64_LO} ]  );
  
         } , () => true , "packer.writeArrU64( 0 , [ {hi:BBPacker.MIN_UINT64_HI - 1  , lo:BBPacker.MIN_UINT64_LO} ]  );" );


   assert.throws( () => {    
          packer.writeArrU64( 0 , [ {hi:BBPacker.MIN_UINT64_HI  , lo:BBPacker.MIN_UINT64_LO - 1} ]  );
  
         } , () => true , "packer.writeArrU64( 0 , [ {hi:BBPacker.MIN_UINT64_HI  , lo:BBPacker.MIN_UINT64_LO - 1} ]  );" );

   assert.throws( () => {    
           packer.resetIndex();
           packer.putU64( {hi:BBPacker.MAX_UINT64_HI + 1  , lo:BBPacker.MAX_UINT64_LO }  );
  
         } , () => true , "packer.putU64( {hi:BBPacker.MAX_UINT64_HI + 1  , lo:BBPacker.MAX_UINT64_LO }  );" );


   assert.throws( () => {    
           packer.resetIndex();
           packer.putU64( {hi:BBPacker.MAX_UINT64_HI   , lo:BBPacker.MAX_UINT64_LO + 1 }  );
  
         } , () => true , "packer.putU64( {hi:BBPacker.MAX_UINT64_HI   , lo:BBPacker.MAX_UINT64_LO + 1 }  );" );

   assert.throws( () => {    
           packer.resetIndex();
           packer.putU64( {hi:BBPacker.MIN_UINT64_HI - 1  , lo:BBPacker.MIN_UINT64_LO } );
  
         } , () => true , "packer.putU64( {hi:BBPacker.MIN_UINT64_HI - 1  , lo:BBPacker.MIN_UINT64_LO } );" );


   assert.throws( () => {    
           packer.resetIndex();
           packer.putU64( {hi:BBPacker.MIN_UINT64_HI   , lo:BBPacker.MIN_UINT64_LO - 1 } );
  
         } , () => true , "packer.putU64( {hi:BBPacker.MIN_UINT64_HI   , lo:BBPacker.MIN_UINT64_LO - 1 } );" );


   assert.throws( () => {    
           packer.resetIndex();
           packer.putArrU64( [ {hi:BBPacker.MAX_UINT64_HI + 1  , lo:BBPacker.MAX_UINT64_LO }]  );
  
         } , () => true , "packer.putArrU64( [ {hi:BBPacker.MAX_UINT64_HI + 1  , lo:BBPacker.MAX_UINT64_LO }]  );" );

   assert.throws( () => {    
           packer.resetIndex();
           packer.putArrU64( [ {hi:BBPacker.MAX_UINT64_HI  , lo:BBPacker.MAX_UINT64_LO + 1 }]  );
  
         } , () => true , "packer.putArrU64( [ {hi:BBPacker.MAX_UINT64_HI  , lo:BBPacker.MAX_UINT64_LO + 1 }]  );" );


   assert.throws( () => {    
           packer.resetIndex();
           packer.putArrU64( [{hi:BBPacker.MIN_UINT64_HI - 1 , lo:BBPacker.MIN_UINT64_LO }] );
  
         } , () => true , "packer.putArrU64( [{hi:BBPacker.MIN_UINT64_HI - 1 , lo:BBPacker.MIN_UINT64_LO }] );" );

   assert.throws( () => {    
           packer.resetIndex();
           packer.putArrU64( [{hi:BBPacker.MIN_UINT64_HI  , lo:BBPacker.MIN_UINT64_LO - 1 }] );
  
         } , () => true , "packer.putArrU64( [{hi:BBPacker.MIN_UINT64_HI  , lo:BBPacker.MIN_UINT64_LO - 1 }] );" );




       return assert.ok(true); 
  });

 
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


  it('ReadWriteI64', async (ctx) => {
    

      await ctx.test( "writeI64" , () =>{

      let packer = new  BBPacker( 8 , {littleEndian : true} );         

       packer.writeI64( 0 ,  fromBigInt( 0x11_22_33_44_55_66_77_88n ) ); 

       if( packer.readU8(0) != 0x88 )  
       {
         throw new Error("packer.readU8(0) != 0x88");
       } 

       if( packer.readU8(1) != 0x77 )  
       {
         throw new Error("packer.readU8(1) != 0x77");
       } 

       if( packer.readU8(2) != 0x66 )  
       {
         throw new Error("packer.readU8(2) != 0x66");
       } 

       if( packer.readU8(3) != 0x55 )  
       {
         throw new Error("packer.readU8(3) != 0x55");
       } 

       if( packer.readU8(4) != 0x44 )  
       {
         throw new Error("packer.readU8(4) != 0x44");
       } 

       if( packer.readU8(5) != 0x33 )  
       {
         throw new Error("packer.readU8(5) != 0x33");
       } 

       if( packer.readU8(6) != 0x22 )  
       {
         throw new Error("packer.readU8(6) != 0x22");
       } 

       if( packer.readU8(7) != 0x11 )  
       {
         throw new Error("packer.readU8(7) != 0x11");
       } 



     
       packer.writeI64( 0 ,  fromBigInt( 0x11_22_33_44_55_66_77_88n ) , false ); 


       if( packer.readU8(0) != 0x11 )  
       {
         throw new Error("packer.readU8(0) != 0x11");
       } 

       if( packer.readU8(1) != 0x22 )  
       {
         throw new Error("packer.readU8(1) != 0x22");
       } 

       if( packer.readU8(2) != 0x33 )  
       {
         throw new Error("packer.readU8(2) != 0x33");
       } 

       if( packer.readU8(3) != 0x44 )  
       {
         throw new Error("packer.readU8(3) != 0x44");
       } 

       if( packer.readU8(4) != 0x55 )  
       {
         throw new Error("packer.readU8(4) != 0x55");
       } 

       if( packer.readU8(5) != 0x66 )  
       {
         throw new Error("packer.readU8(5) != 0x66");
       } 

       if( packer.readU8(6) != 0x77 )  
       {
         throw new Error("packer.readU8(6) != 0x77");
       } 

       if( packer.readU8(7) != 0x88 )  
       {
         throw new Error("packer.readU8(7) != 0x88");
       } 





       packer = new  BBPacker( 8 , {littleEndian : false} );         

       packer.writeI64( 0 ,  fromBigInt( 0x11_22_33_44_55_66_77_88n ) ); 

       if( packer.readU8(0) != 0x11 )  
       {
         throw new Error("packer.readU8(0) != 0x11");
       } 

       if( packer.readU8(1) != 0x22 )  
       {
         throw new Error("packer.readU8(1) != 0x22");
       } 

       if( packer.readU8(2) != 0x33 )  
       {
         throw new Error("packer.readU8(2) != 0x33");
       } 

       if( packer.readU8(3) != 0x44 )  
       {
         throw new Error("packer.readU8(3) != 0x44");
       } 

       if( packer.readU8(4) != 0x55 )  
       {
         throw new Error("packer.readU8(4) != 0x55");
       } 

       if( packer.readU8(5) != 0x66 )  
       {
         throw new Error("packer.readU8(5) != 0x66");
       } 

       if( packer.readU8(6) != 0x77 )  
       {
         throw new Error("packer.readU8(6) != 0x77");
       } 

       if( packer.readU8(7) != 0x88 )  
       {
         throw new Error("packer.readU8(7) != 0x88");
       } 



       packer.writeI64( 0 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) , true ); 



      if( packer.readU8(0) != 0x88 )  
       {
         throw new Error("packer.readU8(0) != 0x88");
       } 

       if( packer.readU8(1) != 0x77 )  
       {
         throw new Error("packer.readU8(1) != 0x77");
       } 

       if( packer.readU8(2) != 0x66 )  
       {
         throw new Error("packer.readU8(2) != 0x66");
       } 

       if( packer.readU8(3) != 0x55 )  
       {
         throw new Error("packer.readU8(3) != 0x55");
       } 

       if( packer.readU8(4) != 0x44 )  
       {
         throw new Error("packer.readU8(4) != 0x44");
       } 

       if( packer.readU8(5) != 0x33 )  
       {
         throw new Error("packer.readU8(5) != 0x33");
       } 

       if( packer.readU8(6) != 0x22 )  
       {
         throw new Error("packer.readU8(6) != 0x22");
       } 

       if( packer.readU8(7) != 0x11 )  
       {
         throw new Error("packer.readU8(7) != 0x11");
       } 


   assert.throws( () => {    
          packer.writeI64( 1 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) );
  
         } , () => true , "packer.writeI64( 1 , fromBigInt( 0x11_22_33_44_55_66_77_88n ) );" );



          return assert.ok(true); 
      });  


      await ctx.test( "readI64" , () =>{

      let packer = new  BBPacker( 8 , {littleEndian : true} );         

       packer.writeI64( 0 ,  fromBigInt( 0x11_22_33_44_55_66_77_08n ) ); 


       if(  toBigInt(packer.readI64(0))  != 0x11_22_33_44_55_66_77_08n )
       {
         throw new Error("toBigInt(packer.readI64(0))  != 0x11_22_33_44_55_66_77_08n");
       }  

       if( toBigInt(packer.readI64(0,false))  != 0x08_77_66_55_44_33_22_11n)
       {
         throw new Error("toBigInt(packer.readU64(0,false))  != 0x08_77_66_55_44_33_22_11n");
       }  

   assert.throws( () => {    
          packer.readI64( 1 );
  
         } , () => true , "packer.readI64( 1 );" );



       packer.writeI64( 0 , fromBigInt( -0xFFFF_FFFF_FFFFn ) ); 


       if(  toBigInt(packer.readI64(0))  != -0xFFFF_FFFF_FFFFn )
       {
         throw new Error(" toBigInt(packer.readI64(0))  != -0xFFFF_FFFF_FFFFn");
       }  


          return assert.ok(true); 
      });  

      
      await ctx.test( "writeArrI64,readArrI64" , () =>{

      let packer = new  BBPacker( 17 , {littleEndian : true} );         


      packer.writeArrI64( 0 ,  [ fromBigInt( 0x11_22_33_44_55_66_77_08n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] ); 

   assert.throws( () => {    
          packer.writeArrI64( 2 ,  [ fromBigInt( 0x00_00_33_44_55_66_77_08n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] );
  
         } , () => true , "packer.writeArrI64( 2 ,  [ fromBigInt( 0x00_00_33_44_55_66_77_08n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] );" );

   assert.throws( () => {    
          packer.writeArrI64( 0 ,  [ fromBigInt( 0x11_aa_33_44_55_66_77_08n )  , fromBigInt( 0x01_bb_03_04_05_06_07_08n ) , fromBigInt( 0x01_cc_03_04_05_06_07_08n )  ] );
  
         } , () => true , "packer.writeArrI64( 0 ,  [ fromBigInt( 0x11_aa_33_44_55_66_77_08n )  , fromBigInt( 0x01_bb_03_04_05_06_07_08n ) , fromBigInt( 0x01_cc_03_04_05_06_07_08n )  ] );" );

  assert.throws( () => {    
          packer.readArrI64( 0 ,  3 );
  
         } , () => true , "packer.readArrI64( 0 ,  3 );" );
 
  assert.throws( () => {    
           packer.readArrI64( 17 );
  
         } , () => true , " packer.readArrI64( 17 );" );





      const arr1 = packer.readArrI64(0);

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

 
      if( toBigInt(arr1[0])   != 0x11_22_33_44_55_66_77_08n )
      {
         throw new Error("toBigInt(arr1[0])   != 0x11_22_33_44_55_66_77_08n");
      }  

      if( toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n )
      {
         throw new Error("toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n");
      }  

      const arr2 = packer.readArrI64(0,1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_08n )
      {
         throw new Error("toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_08n");
      }  

       
      const arr3 = packer.readArrI64(0,false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

 

      if( toBigInt(arr3[0]) !=  0x08_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr3[0]) !=  0x08_77_66_55_44_33_22_11n");
      }  

      if( toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n )
      {
         throw new Error("toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n");
      }  


      const arr4 =  packer.readArrI64(0,1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( toBigInt(arr4[0]) != 0x08_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr4[0]) != 0x08_77_66_55_44_33_22_11n");
      }  

      packer.writeArrI64( 0 ,  [ fromBigInt( 0x11_22_33_44_55_66_77_08n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] , false );

      const arr5 =  packer.readArrI64(0,1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( toBigInt(arr5[0]) != 0x08_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr5[0]) != 0x08_77_66_55_44_33_22_11n");
      }  

      packer.writeArrI64( 0 ,  [ fromBigInt( -0xFFFF_FFFF_FFFFn )  , fromBigInt( -0x0FFF_FFFF_FFFFn ) ] ); 

      const arr6 = packer.readArrI64(0);

      if( arr6.length != 2 )
      {
         throw new Error("arr6.length != 2");
      }

 
      if( toBigInt(arr6[0])   != -0xFFFF_FFFF_FFFFn )
      {
         throw new Error("toBigInt(arr6[0])   != -0xFFFF_FFFF_FFFFn");
      }  

      if( toBigInt(arr6[1]) != -0x0FFF_FFFF_FFFFn )
      {
         throw new Error("toBigInt(arr6[1]) != -0x0FFF_FFFF_FFFFn");
      }  

          return assert.ok(true); 
      });  



      await ctx.test( "putI64,getI64" , () =>{

      let packer = new  BBPacker( 16 , {littleEndian : true} );         

         


       packer.putI64( fromBigInt( 0x11_22_33_44_55_66_77_08n ) ); 
       packer.putI64( fromBigInt( 0x01_02_03_04_05_06_07_08n ) ); 


       packer.resetIndex();


       if( toBigInt(packer.getI64()) != 0x11_22_33_44_55_66_77_08n )
       {
         throw new Error(" toBigInt(packer.getI64()) != 0x11_22_33_44_55_66_77_08n");
       }  

       if( toBigInt(packer.getI64()) != 0x01_02_03_04_05_06_07_08n )
       {
         throw new Error("toBigInt(packer.getI64()) != 0x01_02_03_04_05_06_07_08n");
       }  

       packer.resetIndex();

       packer.putI64(fromBigInt( 0x11_22_33_44_55_66_77_08n ) , false ); 
       packer.putI64(fromBigInt( 0x01_02_03_04_05_06_07_08n ) , false ); 

       packer.resetIndex();

       if( toBigInt(packer.getI64()) != 0x08_77_66_55_44_33_22_11n )
       {
         throw new Error("toBigInt(packer.getI64()) != 0x08_77_66_55_44_33_22_11n");
       }  

       if( toBigInt(packer.getI64()) != 0x08_07_06_05_04_03_02_01n )
       {
         throw new Error("toBigInt(packer.getI64()) != 0x08_07_06_05_04_03_02_01n");
       }  


       packer.resetIndex();

       packer.putI64( fromBigInt( 0x11_22_33_44_55_66_77_08n )  ); 
       packer.putI64( fromBigInt( 0x01_02_03_04_05_06_07_08n )  ); 


       packer.resetIndex();

       if( toBigInt(packer.getI64(false)) != 0x08_77_66_55_44_33_22_11n)
       {
         throw new Error("toBigInt(packer.getI64(false)) != 0x08_77_66_55_44_33_22_11n");
       }  

       if(toBigInt(packer.getI64(false)) != 0x08_07_06_05_04_03_02_01n )
       {
         throw new Error("toBigInt(packer.getI64(false)) != 0x08_07_06_05_04_03_02_01n");
       }  

  assert.throws( () => {    
           packer.putI64( fromBigInt( 0x11_22_33_44_55_66_77_88n )  );
  
         } , () => true , "packer.putI64( fromBigInt( 0x11_22_33_44_55_66_77_88n )  );" );

  assert.throws( () => {    
           packer.getI64(  );
  
         } , () => true , "packer.getI64(  );" );

 
       packer.resetIndex();

       packer.putI64( fromBigInt( -0xFFFF_FFFF_0000n ) ); 
       packer.putI64( fromBigInt( -0x5555_FFFF_0000n ) ); 


       packer.resetIndex();


       if( toBigInt(packer.getI64()) != -0xFFFF_FFFF_0000n )
       {
         throw new Error(" toBigInt(packer.getI64()) != -0xFFFF_FFFF_0000n");
       }  

       if( toBigInt(packer.getI64()) != -0x5555_FFFF_0000n )
       {
         throw new Error("toBigInt(packer.getI64()) != -0x5555_FFFF_0000n");
       }  


          return assert.ok(true); 
      });  


     await ctx.test( "putArrI64,getArrI64" , () =>{

      let packer = new  BBPacker( 17 , {littleEndian : true} );         

      packer.putArrI64(  [ fromBigInt( 0x11_22_33_44_55_66_77_08n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] ); 

 assert.throws( () => {    
           packer.putArrI64( [ fromBigInt( 0x00_00_00_00_00_00_00_00n ) ] );
  
         } , () => true , "packer.putArrI64( [ fromBigInt( 0x00_00_00_00_00_00_00_00n ) ] );" );

 assert.throws( () => {    
           packer.getArrI64( );
  
         } , () => true , "packer.getArrI64( );" );



      packer.resetIndex();


      const arr1 = packer.getArrI64();

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( toBigInt(arr1[0]) != 0x11_22_33_44_55_66_77_08n )
      {
         throw new Error("toBigInt(arr1[0]) != 0x11_22_33_44_55_66_77_08n");
      }  

      if( toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n )
      {
         throw new Error("toBigInt(arr1[1]) != 0x01_02_03_04_05_06_07_08n");
      }  

      packer.resetIndex();

      const arr2 = packer.getArrI64(1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_08n )
      {
         throw new Error("toBigInt(arr2[0]) != 0x11_22_33_44_55_66_77_08n");
      }  

      packer.resetIndex(); 

      const arr3 = packer.getArrI64(false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( toBigInt(arr3[0]) != 0x08_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr3[0]) != 0x08_77_66_55_44_33_22_11n");
      }  

      if( toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n )  
      {
         throw new Error("toBigInt(arr3[1]) != 0x08_07_06_05_04_03_02_01n");
      }  

      packer.resetIndex(); 


      const arr4 =  packer.getArrI64(1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( toBigInt(arr4[0]) != 0x08_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr4[0]) != 0x08_77_66_55_44_33_22_11n");
      }  

      packer.resetIndex(); 

      packer.putArrI64(  [ fromBigInt( 0x11_22_33_44_55_66_77_08n )  , fromBigInt( 0x01_02_03_04_05_06_07_08n ) ] , false );

      packer.resetIndex(); 

      const arr5 =  packer.getArrI64(1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( toBigInt(arr5[0]) !=0x08_77_66_55_44_33_22_11n )
      {
         throw new Error("toBigInt(arr5[0]) !=0x08_77_66_55_44_33_22_11n");
      }  


      packer.resetIndex(); 

      packer.putArrI64(  [ fromBigInt( -0xFFFF_FFFF_5555n )  , fromBigInt( -0xFFFF_FFFF_AAAAn ) ] ); 

      packer.resetIndex(); 

      const arr6 = packer.getArrI64();

      if( arr6.length != 2 )
      {
         throw new Error("arr6.length != 2");
      }

      if( toBigInt(arr6[0]) != -0xFFFF_FFFF_5555n )
      {
         throw new Error("toBigInt(arr6[0]) != -0xFFFF_FFFF_5555n");
      }  

      if( toBigInt(arr6[1]) != -0xFFFF_FFFF_AAAAn )
      {
         throw new Error("toBigInt(arr6[1]) != -0xFFFF_FFFF_AAAAn");
      }  



          return assert.ok(true); 
      });  


       return assert.ok(true); 
  });
 


it('ReadWriteOvfI64', () => {
    
      const packer = new  BBPacker( 8 , {throwAtRangeOverflow:true} );  

      packer.writeI64( 0 , {hi:BBPacker.MAX_INT64_HI , lo:BBPacker.MAX_INT64_LO} );
      packer.writeI64( 0 , {hi:BBPacker.MIN_INT64_HI , lo:BBPacker.MIN_INT64_LO} );
      packer.writeArrI64( 0 , [ {hi:BBPacker.MAX_INT64_HI , lo:BBPacker.MAX_INT64_LO} ]  ); 
      packer.writeArrI64( 0 , [ {hi:BBPacker.MIN_INT64_HI , lo:BBPacker.MIN_INT64_LO} ]  ); 

      packer.resetIndex();


      packer.putI64( {hi:BBPacker.MAX_INT64_HI , lo:BBPacker.MAX_INT64_LO} );

      packer.resetIndex();

      packer.putI64( {hi:BBPacker.MIN_INT64_HI , lo:BBPacker.MIN_INT64_LO} );

      packer.resetIndex();


      packer.putArrI64( [ {hi:BBPacker.MAX_INT64_HI , lo:BBPacker.MAX_INT64_LO} ] );
       
      packer.resetIndex();

      packer.putArrI64( [ {hi:BBPacker.MIN_INT64_HI , lo:BBPacker.MIN_INT64_LO} ] );

 assert.throws( () => {    
           packer.writeI64( 0 , {hi:BBPacker.MAX_INT64_HI + 1 , lo:BBPacker.MAX_INT64_LO} );
  
         } , () => true , "packer.writeI64( 0 , {hi:BBPacker.MAX_INT64_HI + 1 , lo:BBPacker.MAX_INT64_LO} );" );

 assert.throws( () => {    
           packer.writeI64( 0 , {hi:BBPacker.MAX_INT64_HI , lo:BBPacker.MAX_INT64_LO+1} );
  
         } , () => true , "packer.writeI64( 0 , {hi:BBPacker.MAX_INT64_HI , lo:BBPacker.MAX_INT64_LO+1} );" );

 assert.throws( () => {    
           packer.writeI64( 0 , {hi:BBPacker.MIN_INT64_HI - 1 , lo:BBPacker.MIN_INT64_LO} );
  
         } , () => true , "packer.writeI64( 0 , {hi:BBPacker.MIN_INT64_HI - 1 , lo:BBPacker.MIN_INT64_LO} );" );


 assert.throws( () => {    
           packer.writeI64( 0 , {hi:BBPacker.MIN_INT64_HI  , lo:BBPacker.MIN_INT64_LO - 1} );
  
         } , () => true , "packer.writeI64( 0 , {hi:BBPacker.MIN_INT64_HI  , lo:BBPacker.MIN_INT64_LO - 1} );" );

 assert.throws( () => {    
           packer.writeArrI64( 0 , [  {hi:BBPacker.MAX_INT64_HI + 1 , lo:BBPacker.MAX_INT64_LO} ]  );
  
         } , () => true , "packer.writeArrI64( 0 , [  {hi:BBPacker.MAX_INT64_HI + 1 , lo:BBPacker.MAX_INT64_LO} ]  );" );


 assert.throws( () => {    
           packer.writeArrI64( 0 , [  {hi:BBPacker.MAX_INT64_HI  , lo:BBPacker.MAX_INT64_LO + 1} ]  );
  
         } , () => true , "packer.writeArrI64( 0 , [  {hi:BBPacker.MAX_INT64_HI  , lo:BBPacker.MAX_INT64_LO + 1} ]  );" );

 assert.throws( () => {    
           packer.writeArrI64( 0 , [ {hi:BBPacker.MIN_INT64_HI - 1  , lo:BBPacker.MIN_INT64_LO} ]  );
  
         } , () => true , "packer.writeArrI64( 0 , [ {hi:BBPacker.MIN_INT64_HI - 1  , lo:BBPacker.MIN_INT64_LO} ]  );" );

 assert.throws( () => {    
           packer.writeArrI64( 0 , [ {hi:BBPacker.MIN_INT64_HI  , lo:BBPacker.MIN_INT64_LO - 1} ]  );
  
         } , () => true , "packer.writeArrI64( 0 , [ {hi:BBPacker.MIN_INT64_HI  , lo:BBPacker.MIN_INT64_LO - 1} ]  );" );


 assert.throws( () => {    
           packer.resetIndex();
           packer.putI64( {hi:BBPacker.MAX_INT64_HI + 1  , lo:BBPacker.MAX_INT64_LO }  );
  
         } , () => true , "packer.putI64( {hi:BBPacker.MAX_INT64_HI + 1  , lo:BBPacker.MAX_INT64_LO }  );" );

 assert.throws( () => {    
           packer.resetIndex();
           packer.putI64( {hi:BBPacker.MAX_INT64_HI   , lo:BBPacker.MAX_INT64_LO + 1 }  );
  
         } , () => true , "packer.putI64( {hi:BBPacker.MAX_INT64_HI   , lo:BBPacker.MAX_INT64_LO + 1 }  );" );


 assert.throws( () => {    
           packer.resetIndex();
           packer.putI64( {hi:BBPacker.MIN_INT64_HI - 1  , lo:BBPacker.MIN_INT64_LO } );
  
         } , () => true , "packer.putI64( {hi:BBPacker.MIN_INT64_HI - 1  , lo:BBPacker.MIN_INT64_LO } );" );


 assert.throws( () => {    
           packer.resetIndex();
           packer.putI64( {hi:BBPacker.MIN_INT64_HI   , lo:BBPacker.MIN_INT64_LO - 1 } );
  
         } , () => true , "packer.putI64( {hi:BBPacker.MIN_INT64_HI   , lo:BBPacker.MIN_INT64_LO - 1 } );" );

 assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI64( [ {hi:BBPacker.MAX_INT64_HI + 1  , lo:BBPacker.MAX_INT64_LO }]  );
  
         } , () => true , "packer.putArrI64( [ {hi:BBPacker.MAX_INT64_HI + 1  , lo:BBPacker.MAX_INT64_LO }]  );" );

 assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI64( [ {hi:BBPacker.MAX_INT64_HI  , lo:BBPacker.MAX_INT64_LO + 1 }]  );
  
         } , () => true , "packer.putArrI64( [ {hi:BBPacker.MAX_INT64_HI  , lo:BBPacker.MAX_INT64_LO + 1 }]  );" );

 assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI64( [{hi:BBPacker.MIN_INT64_HI - 1 , lo:BBPacker.MIN_INT64_LO }] );
  
         } , () => true , "packer.putArrI64( [{hi:BBPacker.MIN_INT64_HI - 1 , lo:BBPacker.MIN_INT64_LO }] );" );

 assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI64( [{hi:BBPacker.MIN_INT64_HI  , lo:BBPacker.MIN_INT64_LO - 1 }] );
  
         } , () => true , "packer.putArrI64( [{hi:BBPacker.MIN_INT64_HI  , lo:BBPacker.MIN_INT64_LO - 1 }] );" );





       return assert.ok(true); 
  });

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  return assert.ok(true);
}