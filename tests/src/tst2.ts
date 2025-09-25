import {suite,it,TestContext} from 'node:test';
import assert from 'node:assert/strict';
import {BBPacker} from "../../dist/BBPacker.js"



export async function tst2()
{
    

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  it('ReadWriteI8', () => {
    
       const packer = new  BBPacker( 3 );         

       packer.writeI8( 0 , 0x11 );
       packer.writeI8( 1 , -10 );
       packer.writeI8( 2 , 0x33 );
         
         assert.throws( () => {    
           packer.writeI8( 3 , 0x04 );
  
         } , () => true , 'packer.writeI8( 3 , 0x04 );' );

         assert.throws( () => {    
          packer.readI8( 3 );
  
         } , () => true , 'packer.readI8( 3 );' );



       if( packer.readI8( 0 ) != 0x11 )
       {
          throw new Error("packer.readI8( 0 ) != 0x11");
       } 

       if( packer.readI8( 1 ) != -10 )
       {
          throw new Error("packer.readI8( 1 ) != -10");
       } 

       if( packer.readI8( 2 ) != 0x33 )
       {
          throw new Error("packer.readI8( 2 ) != 0x33");
       } 




        
       packer.writeArrI8( 0 , [ 0x51 , -124 , 0x53 ]  ); 

         assert.throws( () => {    
          packer.writeArrI8( 0 , [ 0x11 , 0x22 , 0x33 , 0x00 ]  );
  
         } , () => true , 'packer.writeArrI8( 0 , [ 0x11 , 0x22 , 0x33 , 0x00 ]  );' );

         assert.throws( () => {    
           packer.readArrI8( 4 ); 
  
         } , () => true , ' packer.readArrI8( 4 ); ' );
     



       let arr = packer.readArrI8( 0 ); 

       if( arr.length != 3 )
       {
          throw new Error("arr.length != 3");
       } 


       if( arr[0] != 0x51 )
       {
          throw new Error("arr[0] != 0x51");
       } 

       if( arr[1] != -124 )
       {
          throw new Error("arr[1] != -124");
       } 

       if( arr[2] != 0x53 )
       {
          throw new Error("arr[2] != 0x53");
       } 

       arr = packer.readArrI8( 0 , 3 ); 

       if( arr.length != 3 )
       {
          throw new Error("arr.length != 3");
       } 


       if( arr[0] != 0x51 )
       {
          throw new Error("arr[0] != 0x51");
       } 

       if( arr[1] != -124 )
       {
          throw new Error("arr[1] != -124");
       } 

       if( arr[2] != 0x53 )
       {
          throw new Error("arr[2] != 0x53");
       } 

         assert.throws( () => {    
            packer.readArrI8( 0 , 4 ); 
  
         } , () => true , "packer.readArrI8( 0 , 4 );" );



       packer.resetIndex();

       packer.putI8( 0x71 );
       packer.putI8( 0x72 );
       packer.putI8( -99 );

         assert.throws( () => {    
            packer.putI8( 0 ); 
  
         } , () => true , "packer.putI8( 0 );" );
 

       packer.resetIndex();

       if( packer.getI8() != 0x71 )
       {
          throw new Error("packer.getI8() != 0x71");
       } 

       if( packer.getI8() != 0x72 )
       {
          throw new Error("packer.getI8() != 0x72");
       } 

       if( packer.getI8() != -99 )
       {
          throw new Error("packer.getI8() != -99");
       } 


         assert.throws( () => {    
            packer.getI8();
  
         } , () => true , "packer.getI8();" );



       packer.resetIndex();

       packer.putArrI8( [ -45 , 0x22 , 0x33 ] );


         assert.throws( () => {    
            packer.putI8( 0 );
  
         } , () => true , "packer.putI8( 0 );" );


      packer.resetIndex();

         assert.throws( () => {    
            packer.putArrI8( [ 0x11 , 0x22 , 0x33 , 0x00 ] );
  
         } , () => true , "packer.putArrI8( [ 0x11 , 0x22 , 0x33 , 0x00 ] );" );




       arr = packer.getArrI8( 3 );



       if( arr[0] != -45 )
       {
          throw new Error("arr[0] != -45");
       } 

       if( arr[1] != 0x22 )
       {
          throw new Error("arr[1] != 0x22");
       } 

       if( arr[2] != 0x33 )
       {
          throw new Error("arr[2] != 0x33");
       } 


      packer.resetIndex();

         assert.throws( () => {    
            packer.getArrI8( 4 );
  
         } , () => true , "packer.getArrI8( 4 );" );



       return assert.ok(true); 
  });
  

  it('ReadWriteOvfI8', () => {
    
      const packer = new  BBPacker( 1 , {throwAtRangeOverflow:true} );  

      packer.writeI8( 0 , BBPacker.MAX_INT8 );
      packer.writeI8( 0 , BBPacker.MIN_INT8 );
      packer.writeArrI8( 0 , [ BBPacker.MAX_INT8 ]  ); 
      packer.writeArrI8( 0 , [ BBPacker.MIN_INT8 ]  ); 

      packer.resetIndex();


      packer.putI8( BBPacker.MAX_INT8 );

      packer.resetIndex();

      packer.putI8( BBPacker.MIN_INT8 );

      packer.resetIndex();


      packer.putArrI8( [ BBPacker.MAX_INT8 ] );
       
      packer.resetIndex();

      packer.putArrI8( [ BBPacker.MIN_INT8 ] );

         assert.throws( () => {    
           packer.writeI8( 0 , BBPacker.MAX_INT8 + 1 );
  
         } , () => true , "packer.writeI8( 0 , BBPacker.MAX_INT8 + 1 );" );

         assert.throws( () => {    
           packer.writeI8( 0 , BBPacker.MIN_INT8 - 1 );
  
         } , () => true , "packer.writeI8( 0 , BBPacker.MIN_INT8 - 1 );" );


         assert.throws( () => {    
          packer.writeArrI8( 0 , [ BBPacker.MAX_INT8 + 1 ]  );
  
         } , () => true , "packer.writeArrI8( 0 , [ BBPacker.MAX_INT8 + 1 ]  );" );


         assert.throws( () => {    
          packer.writeArrI8( 0 , [ BBPacker.MIN_INT8 - 1 ]  );
  
         } , () => true , "packer.writeArrI8( 0 , [ BBPacker.MIN_INT8 - 1 ]  );" );



         assert.throws( () => {    
           packer.resetIndex();
           packer.putI8( BBPacker.MAX_INT8 + 1  );
  
         } , () => true , "packer.putI8( BBPacker.MAX_INT8 + 1  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putI8( BBPacker.MIN_INT8 - 1 );
  
         } , () => true , "packer.putI8( BBPacker.MIN_INT8 - 1 );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI8( [BBPacker.MAX_INT8 + 1]  );
  
         } , () => true , "packer.putArrI8( [BBPacker.MAX_INT8 + 1]  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI8( [BBPacker.MIN_INT8 - 1] );
  
         } , () => true , "packer.putArrI8( [BBPacker.MIN_INT8 - 1] );" );


       return assert.ok(true); 
  });
  

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  it('ReadWriteU16', async (ctx) => {
    

      await ctx.test( "writeU16" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

       packer.writeU16( 0 , 0x1122 ); 

       if( packer.readU8(0) != 0x22 )  
       {
         throw new Error("packer.readU8(0) != 0x22");
       } 

       if( packer.readU8(1) != 0x11 )  
       {
         throw new Error("packer.readU8(1) != 0x11");
       } 


       packer.writeU16( 0 , 0x1122 , false ); 


       if( packer.readU8(0) != 0x11 )  
       {
         throw new Error("packer.readU8(0) != 0x11");
       } 

       if( packer.readU8(1) != 0x22 )  
       {
         throw new Error("packer.readU8(1) != 0x22");
       } 


       packer = new  BBPacker( 4 , {littleEndian : false} );         

       packer.writeU16( 0 , 0x1122 ); 

       if( packer.readU8(0) != 0x11 )  
       {
         throw new Error("packer.readU8(0) != 0x11");
       } 

       if( packer.readU8(1) != 0x22 )  
       {
         throw new Error("packer.readU8(1) != 0x22");
       } 


       packer.writeU16( 0 , 0x1122 , true ); 

       if( packer.readU8(0) != 0x22 )  
       {
         throw new Error("packer.readU8(0) != 0x22");
       } 

       if( packer.readU8(1) != 0x11 )  
       {
         throw new Error("packer.readU8(1) != 0x11");
       } 

       packer.writeU16( 2 , 0x1122 );

         assert.throws( () => {    
           packer.writeU16( 3 , 0x1122 );
  
         } , () => true , "packer.writeU16( 3 , 0x1122 );" );


          return assert.ok(true); 
      });  


      await ctx.test( "readU16" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

       packer.writeU16( 0 , 0x1122 ); 

       if( packer.readU16(0) != 0x1122 )
       {
         throw new Error("packer.readU16(0) != 0x1122");
       }  

       if( packer.readU16(0,false) != 0x2211 )
       {
         throw new Error("packer.readU16(0,false) != 0x2211");
       }  

       packer.writeU16( 2 , 0x3312 ); 
       

       if( packer.readU16( 2 ) != 0x3312 )
       {
          throw new Error("packer.readU16( 2 ) != 0x3312");
       }   

         assert.throws( () => {    
           packer.readU16( 3 );
  
         } , () => true , "packer.readU16( 3 );" );


          return assert.ok(true); 
      });  

      
      await ctx.test( "writeArrU16,readArrU16" , () =>{

      let packer = new  BBPacker( 5 , {littleEndian : true} );         

      packer.writeArrU16( 0 ,  [ 0x1122 , 0x3344 ] ); 

         assert.throws( () => {    
            packer.writeArrU16( 2 ,  [ 0x0000 , 0x1111 ] );
  
         } , () => true , " packer.writeArrU16( 2 ,  [ 0x0000 , 0x1111 ] );" );

         assert.throws( () => {    
            packer.writeArrU16( 0 ,  [ 0x0000 , 0x1111 , 0x2222 ] );
  
         } , () => true , "packer.writeArrU16( 0 ,  [ 0x0000 , 0x1111 , 0x2222 ] );" );


         assert.throws( () => {    
            packer.readArrU16( 0 ,  3 );
  
         } , () => true , "packer.readArrU16( 0 ,  3 );" );

         assert.throws( () => {    
            packer.readArrU16( 5 );
  
         } , () => true , "packer.readArrU16( 5 );" );





      const arr1 = packer.readArrU16(0);

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( arr1[0] != 0x1122 )
      {
         throw new Error("arr1[0] != 0x1122");
      }  

      if( arr1[1] != 0x3344 )
      {
         throw new Error("arr1[1] != 0x3344");
      }  

      const arr2 = packer.readArrU16(0,1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( arr2[0] != 0x1122 )
      {
         throw new Error("arr2[0] != 0x1122");
      }  

       
      const arr3 = packer.readArrU16(0,false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( arr3[0] != 0x2211 )
      {
         throw new Error("arr3[0] != 0x2211");
      }  

      if( arr3[1] != 0x4433 )
      {
         throw new Error("arr3[1] != 0x4433");
      }  


      const arr4 =  packer.readArrU16(0,1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( arr4[0] != 0x2211 )
      {
         throw new Error("arr4[0] != 0x2211");
      }  

      packer.writeArrU16( 0 ,  [ 0x1122 , 0x3344 ] , false );

      const arr5 =  packer.readArrU16(0,1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( arr5[0] != 0x2211 )
      {
         throw new Error("arr5[0] != 0x2211");
      }  



          return assert.ok(true); 
      });  



      await ctx.test( "putU16,getU16" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

         


       packer.putU16( 0x1122 ); 
       packer.putU16( 0x4455 ); 


       packer.resetIndex();


       if( packer.getU16() != 0x1122 )
       {
         throw new Error("packer.getU16() != 0x1122");
       }  

       if( packer.getU16() != 0x4455 )
       {
         throw new Error("packer.getU16() != 0x4455");
       }  

       packer.resetIndex();

       packer.putU16( 0x1122 , false ); 
       packer.putU16( 0x4455 , false ); 

       packer.resetIndex();

       if( packer.getU16() != 0x2211 )
       {
         throw new Error("packer.getU16() != 0x2211");
       }  

       if( packer.getU16() != 0x5544 )
       {
         throw new Error("packer.getU16() != 0x5544");
       }  


       packer.resetIndex();

       packer.putU16( 0x1122  ); 
       packer.putU16( 0x4455  ); 


       packer.resetIndex();

       if( packer.getU16(false) != 0x2211 )
       {
         throw new Error("packer.getU16(false) != 0x2211");
       }  

       if( packer.getU16(false) != 0x5544 )
       {
         throw new Error("packer.getU16(false) != 0x5544");
       }  

         assert.throws( () => {    
           packer.putU16( 0x0000  );
  
         } , () => true , "packer.putU16( 0x0000  );" );

         assert.throws( () => {    
           packer.getU16(  );
  
         } , () => true , "packer.getU16(  );" );




          return assert.ok(true); 
      });  


     await ctx.test( "putArrU16,getArrU16" , () =>{

      let packer = new  BBPacker( 5 , {littleEndian : true} );         

      packer.putArrU16( [ 0x1122 , 0x3344 ] ); 

         assert.throws( () => {    
            packer.putArrU16( [ 0x0000 ] );
  
         } , () => true , " packer.putArrU16( [ 0x0000 ] );" );


         assert.throws( () => {    
            packer.getArrU16( );
  
         } , () => true , "packer.getArrU16( );" );



      packer.resetIndex();


      const arr1 = packer.getArrU16();

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( arr1[0] != 0x1122 )
      {
         throw new Error("arr1[0] != 0x1122");
      }  

      if( arr1[1] != 0x3344 )
      {
         throw new Error("arr1[1] != 0x3344");
      }  

      packer.resetIndex();

      const arr2 = packer.getArrU16(1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( arr2[0] != 0x1122 )
      {
         throw new Error("arr2[0] != 0x1122");
      }  

      packer.resetIndex(); 

      const arr3 = packer.getArrU16(false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( arr3[0] != 0x2211 )
      {
         throw new Error("arr3[0] != 0x2211");
      }  

      if( arr3[1] != 0x4433 )
      {
         throw new Error("arr3[1] != 0x4433");
      }  

      packer.resetIndex(); 


      const arr4 =  packer.getArrU16(1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( arr4[0] != 0x2211 )
      {
         throw new Error("arr4[0] != 0x2211");
      }  

      packer.resetIndex(); 

      packer.putArrU16(  [ 0x1122 , 0x3344 ] , false );

      packer.resetIndex(); 

      const arr5 =  packer.getArrU16(1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( arr5[0] != 0x2211 )
      {
         throw new Error("arr5[0] != 0x2211");
      }  


          return assert.ok(true); 
      });  


       return assert.ok(true); 
  });
  
  it('ReadWriteOvfU16', () => {
    
      const packer = new  BBPacker( 2 , {throwAtRangeOverflow:true} );  

      packer.writeU16( 0 , BBPacker.MAX_UINT16 );
      packer.writeU16( 0 , BBPacker.MIN_UINT16 );
      packer.writeArrU16( 0 , [ BBPacker.MAX_UINT16 ]  ); 
      packer.writeArrU16( 0 , [ BBPacker.MIN_UINT16 ]  ); 

      packer.resetIndex();


      packer.putU16( BBPacker.MAX_UINT16 );

      packer.resetIndex();

      packer.putU16( BBPacker.MIN_UINT16 );

      packer.resetIndex();


      packer.putArrU16( [ BBPacker.MAX_UINT16 ] );
       
      packer.resetIndex();

      packer.putArrU16( [ BBPacker.MIN_UINT16 ] );


         assert.throws( () => {    
            packer.writeU16( 0 , BBPacker.MAX_UINT16 + 1 );
  
         } , () => true , "packer.writeU16( 0 , BBPacker.MAX_UINT16 + 1 );" );

         assert.throws( () => {    
            packer.writeU16( 0 , BBPacker.MIN_UINT16 - 1 );
  
         } , () => true , "packer.writeU16( 0 , BBPacker.MIN_UINT16 - 1 );" );


         assert.throws( () => {    
            packer.writeArrU16( 0 , [ BBPacker.MAX_UINT16 + 1 ]  );
  
         } , () => true , "packer.writeArrU16( 0 , [ BBPacker.MAX_UINT16 + 1 ]  );" );


         assert.throws( () => {    
            packer.writeArrU16( 0 , [ BBPacker.MIN_UINT16 - 1 ]  );
  
         } , () => true , "packer.writeArrU16( 0 , [ BBPacker.MIN_UINT16 - 1 ]  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putU16( BBPacker.MAX_UINT16 + 1  );
  
         } , () => true , " packer.putU16( BBPacker.MAX_UINT16 + 1  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putU16( BBPacker.MIN_UINT16 - 1 );
  
         } , () => true , "packer.putU16( BBPacker.MIN_UINT16 - 1 );" );

         assert.throws( () => {    
           packer.resetIndex();
           packer.putArrU16( [BBPacker.MAX_UINT16 + 1]  );
  
         } , () => true , "packer.putArrU16( [BBPacker.MAX_UINT16 + 1]  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putArrU16( [BBPacker.MIN_UINT16 - 1] );
  
         } , () => true , "packer.putArrU16( [BBPacker.MIN_UINT16 - 1] );" );



       return assert.ok(true); 
  });

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
  it('ReadWriteI16', async (ctx) => {
    

      await ctx.test( "writeI16" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

       packer.writeI16( 0 , 0x1122 ); 

       if( packer.readI8(0) != 0x22 )  
       {
         throw new Error("packer.readI8(0) != 0x22");
       } 

       if( packer.readI8(1) != 0x11 )  
       {
         throw new Error("packer.readI8(1) != 0x11");
       } 


       packer.writeI16( 0 , 0x1122 , false ); 


       if( packer.readI8(0) != 0x11 )  
       {
         throw new Error("packer.readI8(0) != 0x11");
       } 

       if( packer.readI8(1) != 0x22 )  
       {
         throw new Error("packer.readI8(1) != 0x22");
       } 


       packer = new  BBPacker( 4 , {littleEndian : false} );         

       packer.writeI16( 0 , 0x1122 ); 

       if( packer.readI8(0) != 0x11 )  
       {
         throw new Error("packer.readI8(0) != 0x11");
       } 

       if( packer.readI8(1) != 0x22 )  
       {
         throw new Error("packer.readI8(1) != 0x22");
       } 


       packer.writeI16( 0 , 0x1122 , true ); 

       if( packer.readI8(0) != 0x22 )  
       {
         throw new Error("packer.readI8(0) != 0x22");
       } 

       if( packer.readI8(1) != 0x11 )  
       {
         throw new Error("packer.readI8(1) != 0x11");
       } 

       packer.writeI16( 2 , 0x1122 );

         assert.throws( () => {    
           packer.writeI16( 3 , 0x1122 );
  
         } , () => true , " packer.writeI16( 3 , 0x1122 );" );


          return assert.ok(true); 
      });  


      await ctx.test( "readI16" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

       packer.writeI16( 0 , 0x1122 ); 

       if( packer.readI16(0) != 0x1122 )
       {
         throw new Error("packer.readI16(0) != 0x1122");
       }  

       if( packer.readI16(0,false) != 0x2211 )
       {
         throw new Error("packer.readI16(0,false) != 0x2211");
       }  

       packer.writeI16( 2 ,-12345 ); 
       
       if( packer.readI16( 2 ) != -12345 )
       {
          throw new Error("packer.readI16( 2 ) != -12345");
       }   

         assert.throws( () => {    
          packer.readI16( 3 );
  
         } , () => true , "packer.readI16( 3 );" );


          return assert.ok(true); 
      });  

      
      await ctx.test( "writeArrI16,readArrI16" , () =>{

      let packer = new  BBPacker( 5 , {littleEndian : true} );         

      packer.writeArrI16( 0 ,  [ 0x1122 , -1245 ] ); 

         assert.throws( () => {    
          packer.writeArrI16( 2 ,  [ 0x0000 , 0x1111 ] );
  
         } , () => true , "packer.writeArrI16( 2 ,  [ 0x0000 , 0x1111 ] );" );

         assert.throws( () => {    
          packer.writeArrI16( 0 ,  [ 0x0000 , 0x1111 , 0x2222 ] );
  
         } , () => true , "packer.writeArrI16( 0 ,  [ 0x0000 , 0x1111 , 0x2222 ] );" );


         assert.throws( () => {    
          packer.readArrI16( 0 ,  3 );
  
         } , () => true , "packer.readArrI16( 0 ,  3 );" );


         assert.throws( () => {    
          packer.readArrI16( 5 );
  
         } , () => true , "packer.readArrI16( 5 );" );





      const arr1 = packer.readArrI16(0);

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( arr1[0] != 0x1122 )
      {
         throw new Error("arr1[0] != 0x1122");
      }  

      if( arr1[1] != -1245 )
      {
         throw new Error("arr1[1] != -1245");
      }  

      const arr2 = packer.readArrI16(0,1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( arr2[0] != 0x1122 )
      {
         throw new Error("arr2[0] != 0x1122");
      }  

       
      const arr3 = packer.readArrI16(0,false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( arr3[0] != 0x2211 )
      {
         throw new Error("arr3[0] != 0x2211");
      }  



      const arr4 =  packer.readArrI16(0,1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( arr4[0] != 0x2211 )
      {
         throw new Error("arr4[0] != 0x2211");
      }  

      packer.writeArrU16( 0 ,  [ 0x1244 , -67 ] , false );

      const arr5 =  packer.readArrU16(0,1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( arr5[0] != 0x4412 )
      {
         throw new Error("arr5[0] != 0x4412");
      }  



          return assert.ok(true); 
      });  



      await ctx.test( "putI16,getI16" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

         


       packer.putI16( 0x1122 ); 
       packer.putI16( -99 ); 


       packer.resetIndex();


       if( packer.getI16() != 0x1122 )
       {
         throw new Error("packer.getI16() != 0x1122");
       }  

       if( packer.getI16() != -99 )
       {
         throw new Error("packer.getI16() != -99");
       }  

       packer.resetIndex();

       packer.putI16( 0x1122 , false ); 
       packer.putI16( 0x4466 , false ); 

       packer.resetIndex();

       if( packer.getI16() != 0x2211 )
       {
         throw new Error("packer.getI16() != 0x2211");
       }  

       if( packer.getI16() != 0x6644 )
       {
         throw new Error("packer.getI16() != 0x6644");
       }  


       packer.resetIndex();

       packer.putI16( 0x1122  ); 
       packer.putI16( 0x7711  ); 


       packer.resetIndex();

       if( packer.getI16(false) != 0x2211 )
       {
         throw new Error("packer.getI16(false) != 0x2211");
       }  

       if( packer.getI16(false) != 0x1177 )
       {
         throw new Error("packer.getI16(false) != 0x1177");
       }  

         assert.throws( () => {    
          packer.putI16( 0x0000  );
  
         } , () => true , "packer.putI16( 0x0000  );" );

         assert.throws( () => {    
          packer.getI16(  );
  
         } , () => true , "packer.getI16(  );" );



          return assert.ok(true); 
      });  


     await ctx.test( "putArrI16,getArrI16" , () =>{

      let packer = new  BBPacker( 5 , {littleEndian : true} );         

      packer.putArrI16( [ 0x1122 , -12345 ] ); 

         assert.throws( () => {    
          packer.putArrI16( [ 0x0000 ] );
  
         } , () => true , "packer.putArrI16( [ 0x0000 ] );" );


         assert.throws( () => {    
          packer.getArrI16( );
  
         } , () => true , "packer.getArrI16( );" );



      packer.resetIndex();


      const arr1 = packer.getArrI16();

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( arr1[0] != 0x1122 )
      {
         throw new Error("arr1[0] != 0x1122");
      }  

      if( arr1[1] != -12345 )
      {
         throw new Error("arr1[1] != -12345");
      }  

      packer.resetIndex();

      const arr2 = packer.getArrI16(1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( arr2[0] != 0x1122 )
      {
         throw new Error("arr2[0] != 0x1122");
      }  

      packer.resetIndex(); 

      const arr3 = packer.getArrI16(false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( arr3[0] != 0x2211 )
      {
         throw new Error("arr3[0] != 0x2211");
      }  


      packer.resetIndex(); 


      const arr4 =  packer.getArrI16(1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( arr4[0] != 0x2211 )
      {
         throw new Error("arr4[0] != 0x2211");
      }  

      packer.resetIndex(); 

      packer.putArrI16(  [ 0x1122 , -76543 ] , false );

      packer.resetIndex(); 

      const arr5 =  packer.getArrI16(1);

      if( arr5.length != 1 )
      {
         throw new Error("arr5.length != 1");
      }

      if( arr5[0] != 0x2211 )
      {
         throw new Error("arr5[0] != 0x2211");
      }  


          return assert.ok(true); 
      });  


       return assert.ok(true); 
  });

 it('ReadWriteOvfI16', () => {
    
      const packer = new  BBPacker( 2 , {throwAtRangeOverflow:true} );  

      packer.writeI16( 0 , BBPacker.MAX_INT16 );
      packer.writeI16( 0 , BBPacker.MIN_INT16 );
      packer.writeArrI16( 0 , [ BBPacker.MAX_INT16 ]  ); 
      packer.writeArrI16( 0 , [ BBPacker.MIN_INT16 ]  ); 

      packer.resetIndex();


      packer.putI16( BBPacker.MAX_INT16 );

      packer.resetIndex();

      packer.putI16( BBPacker.MIN_INT16 );

      packer.resetIndex();


      packer.putArrI16( [ BBPacker.MAX_INT16 ] );
       
      packer.resetIndex();

      packer.putArrI16( [ BBPacker.MIN_INT16 ] );

         assert.throws( () => {    
          packer.writeI16( 0 , BBPacker.MAX_INT16 + 1 );
  
         } , () => true , "packer.writeI16( 0 , BBPacker.MAX_INT16 + 1 );" );

         assert.throws( () => {    
          packer.writeI16( 0 , BBPacker.MIN_INT16 - 1 );
  
         } , () => true , "packer.writeI16( 0 , BBPacker.MIN_INT16 - 1 );" );


         assert.throws( () => {    
          packer.writeArrI16( 0 , [ BBPacker.MAX_INT16 + 1 ]  );
  
         } , () => true , "packer.writeArrI16( 0 , [ BBPacker.MAX_INT16 + 1 ]  );" );


         assert.throws( () => {    
          packer.writeArrI16( 0 , [ BBPacker.MIN_INT16 - 1 ]  );
  
         } , () => true , "packer.writeArrI16( 0 , [ BBPacker.MIN_INT16 - 1 ]  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putI16( BBPacker.MAX_INT16 + 1  );
  
         } , () => true , "packer.putI16( BBPacker.MAX_INT16 + 1  );" );


         assert.throws( () => {    
           packer.resetIndex();
           packer.putI16( BBPacker.MIN_INT16 - 1 );
  
         } , () => true , "packer.putI16( BBPacker.MIN_INT16 - 1 );" );

         assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI16( [BBPacker.MAX_INT16 + 1]  );
  
         } , () => true , "packer.putArrI16( [BBPacker.MAX_INT16 + 1]  );" );

         assert.throws( () => {    
           packer.resetIndex();
           packer.putArrI16( [BBPacker.MIN_INT16 - 1] );
  
         } , () => true , "packer.putArrI16( [BBPacker.MIN_INT16 - 1] );" );



       return assert.ok(true); 
  });





  return assert.ok(true);
}