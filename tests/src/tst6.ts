import {suite,it,TestContext} from 'node:test';
import assert from 'node:assert/strict';
import {BBPacker} from "../../dist/BBPacker.js"


const DELTA = 0.01;

function cmp( value1 : number , value2 : number )
{

   if( (value1 == 0.0) && ( value2 == 0.0  ) )
    return true;

   if( (value1 < 0.0) && ( value2 > 0.0  )   )
    return false;

   if( (value2 < 0.0) && ( value1 > 0.0  )   )
    return false;


    value1 = Math.abs(value1);
    value2 = Math.abs(value2);

    const diff = Math.abs(value1 - value2);

    if( diff <=  DELTA )
      return true; 

  return false;
}


export async function tst6()
{
    


  it('ReadWriteF32', async (ctx) => {
    

     


      await ctx.test( "readF32" , () =>{

      let packer = new  BBPacker( 4 , {littleEndian : true} );         

       const dig = -112344.2345; 

        packer.writeF32( 0 , dig ); 

         

       if( !cmp( packer.readF32(0) , dig) )
       {
         throw new Error("!cmp( packer.readF32(0) , dig)");
       }  

        packer.writeF32( 0 , dig , false ); 

       if( !cmp(packer.readF32(0,false) , dig) )
       {
         throw new Error("!cmp(packer.readF32(0,false) , dig)");
       }  

       assert.throws( () => {    
          packer.readF32( 1 );
  
         } , () => true , "packer.getArrF64( );" );



          return assert.ok(true); 
      });  

      
      await ctx.test( "writeArrF32,readArrF32" , () =>{

      let packer = new  BBPacker( 9 , {littleEndian : true} );         

      const dig1 = -123456.23435;  
      const dig2 =  87654.987765;  


      packer.writeArrF32( 0 ,  [ dig1 , dig2 ] ); 

       assert.throws( () => {    
          packer.writeArrF32( 2 ,  [ 0.0 , 0.0 ] );
  
         } , () => true , "packer.writeArrF32( 2 ,  [ 0.0 , 0.0 ] );" );


       assert.throws( () => {    
          packer.writeArrF32( 0 ,  [ 0.0 , 0.0 , 0.0 ] );
  
         } , () => true , "packer.writeArrF32( 0 ,  [ 0.0 , 0.0 , 0.0 ] );" );

       assert.throws( () => {    
          packer.readArrF32( 0 ,  3 );
  
         } , () => true , "packer.readArrF32( 0 ,  3 );" );

       assert.throws( () => {    
          packer.readArrF32( 9 );
  
         } , () => true , "packer.readArrF32( 9 );" );





      const arr1 = packer.readArrF32(0);

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( !cmp(arr1[0] , dig1) )
      {
         throw new Error("!cmp(arr1[0] , dig1)");
      }  

      if( !cmp(arr1[1] , dig2) )
      {
         throw new Error(" !cmp(arr1[1] , dig2)");
      }  


      const arr2 = packer.readArrF32(0,1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( !cmp(arr2[0] , dig1) )
      {
         throw new Error("!cmp(arr2[0] , dig1)");
      }  

      packer.writeArrF32( 0 ,  [ dig1 , dig2 ] , false ); 
       
      const arr3 = packer.readArrF32(0,false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }



      if( !cmp(arr3[0] , dig1) )
      {
         throw new Error("!cmp(arr3[0] , dig1)");
      }  

      if( !cmp(arr3[1] , dig2) )
      {
         throw new Error(" !cmp(arr3[1] , dig2)");
      }  


      const arr4 =  packer.readArrF32(0,1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( !cmp(arr4[0] , dig1) )
      {
         throw new Error("!cmp(arr4[0] , dig1)");
      }  


          return assert.ok(true); 
      });  



      await ctx.test( "putF32,getF32" , () =>{

      let packer = new  BBPacker( 8 , {littleEndian : true} );         

         
      const dig1 = -123456.23435;  
      const dig2 =  87654.987765;  


       packer.putF32( dig1 ); 
       packer.putF32( dig2 ); 


       packer.resetIndex();


       if( !cmp(packer.getF32() , dig1) )
       {
         throw new Error("!cmp(packer.getF32() , dig1");
       }  

       if( !cmp(packer.getF32() , dig2) )
       {
         throw new Error("!cmp(packer.getF32() , dig2)");
       }  



       packer.resetIndex();

       packer.putF32( dig1 , false ); 
       packer.putF32( dig2 , false ); 


       packer.resetIndex();

       if( !cmp(packer.getF32(false) , dig1) )
       {
         throw new Error("!cmp(packer.getF32(false) , dig1)");
       }  

       if( !cmp( packer.getF32(false) , dig2 ) )
       {
         throw new Error("!cmp( packer.getF32(false) , dig2 )");
       }  

       assert.throws( () => {    
          packer.putF32( 0.0  );
  
         } , () => true , "packer.putF32( 0.0  );" );

       assert.throws( () => {    
           packer.getF32(  );
  
         } , () => true , " packer.getF32(  );" );



          return assert.ok(true); 
      });  


     await ctx.test( "putArrF32,getArrF32" , () =>{

      let packer = new  BBPacker( 9 , {littleEndian : true} );         

      const dig1 = -123456.23435;  
      const dig2 =  87654.987765;  

      packer.putArrF32( [ dig1 , dig2 ] ); 

       assert.throws( () => {    
           packer.putArrF32( [ 0.0 ] );
  
         } , () => true , "packer.putArrF32( [ 0.0 ] );" );

       assert.throws( () => {    
             packer.getArrF32( );
  
         } , () => true , " packer.getArrF32( );" );




      packer.resetIndex();


      const arr1 = packer.getArrF32();

      if( arr1.length != 2 )
      {
         throw new Error("arr1.length != 2");
      }

      if( !cmp( arr1[0] , dig1) )
      {
         throw new Error("!cmp( arr1[0] , dig1)");
      }  

      if( !cmp(arr1[1] , dig2) )
      {
         throw new Error("!cmp(arr1[1] , dig2)");
      }  

      packer.resetIndex();

      const arr2 = packer.getArrF32(1);

      if( arr2.length != 1 )
      {
         throw new Error("arr2.length != 1");
      }

      if( !cmp(arr2[0] , dig1) )
      {
         throw new Error(" !cmp(arr2[0] , dig1)");
      }  

      packer.resetIndex(); 

      packer.putArrF32( [ dig1 , dig2 ] , false ); 

      packer.resetIndex(); 

      const arr3 = packer.getArrF32(false);

      if( arr3.length != 2 )
      {
         throw new Error("arr3.length != 2");
      }

      if( !cmp(arr3[0] , dig1) )
      {
         throw new Error("!cmp(arr3[0] , dig1)");
      }  

      if( !cmp(arr3[1] , dig2) )  
      {
         throw new Error("!cmp(arr3[1] , dig2)");
      }  

      packer.resetIndex(); 


      const arr4 =  packer.getArrF32(1,false);

      if( arr4.length != 1 )
      {
         throw new Error("arr4.length != 1");
      }

      if( !cmp(arr4[0] , dig1) )
      {
         throw new Error("!cmp(arr4[0] , dig1)");
      }  


          return assert.ok(true); 
      });  


       return assert.ok(true); 
  });
  


  return assert.ok(true);
}