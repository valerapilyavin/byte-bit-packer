import {suite,it,TestContext} from 'node:test';
import assert from 'node:assert/strict';
import {BBPacker} from "../../dist/BBPacker.js"





export async function tst7()
{
    


  it('Bits', async (ctx) => {
    

      await ctx.test( "writeTrue,readTrue" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : false} ); 

             packer1.writeU8(0,0x00);
             packer1.writeU8(1,0x00);
             packer1.writeU8(2,0x00);

             packer1.writeBit( 1 , true ); 
             packer1.writeBit( 5 , true );
             packer1.writeBit( 8 , true );
             packer1.writeBit( 15 , true );
             packer1.writeBit( 20 , true );
             packer1.writeBit( 22 , true );
             packer1.writeBit( 23 , true );



             if( packer1.readU8(0) != 0b0010_0010 ) 
             {
                throw new Error("packer1.readU8(0) != 0b0010_0010");
             } 

             if( packer1.readU8(1) != 0b1000_0001 ) 
             {
                throw new Error("packer1.readU8(1) != 0b1000_0001");
             } 

             if( packer1.readU8(2) != 0b1101_0000 ) 
             {
                throw new Error("packer1.readU8(2) != 0b1101_0000");
             } 

       assert.throws( () => {    
            packer1.writeBit( 24 , true );
  
         } , () => true , "packer1.writeBit( 24 , true );" );



             packer1.writeU8(0,0x00);
             packer1.writeBit( 0 , true , true );


             if( packer1.readU8(0) != 0b1000_0000 ) 
             {
                throw new Error("packer1.readU8(0) != 0b1000_0000");
             } 




             let packer2 = new  BBPacker( 4 , {bitIndexReverse : false} ); 


             packer2.writeU8(0,0x00);
             packer2.writeU8(1,0x00);
             packer2.writeU8(2,0x00);
             packer2.writeU8(3,0x00);

             packer2.writeBit( 1 , true , 1); 
             packer2.writeBit( 5 , true , 1 );
             packer2.writeBit( 8 , true , 1 );
             packer2.writeBit( 15 , true , 1 );
             packer2.writeBit( 20 , true , 1 );
             packer2.writeBit( 22 , true , 1 );
             packer2.writeBit( 23 , true , 1 );
     
             if( packer2.readU8(1) != 0b0010_0010 ) 
             {
                throw new Error("packer2.readU8(1) != 0b0010_0010");
             } 

             if( packer2.readU8(2) != 0b1000_0001 ) 
             {
                throw new Error("packer2.readU8(2) != 0b1000_0001");
             } 

             if( packer2.readU8(3) != 0b1101_0000 ) 
             {
                throw new Error("packer2.readU8(3) != 0b1101_0000");
             } 

       assert.throws( () => {    
             packer1.writeBit( 0 , true , 4 );
  
         } , () => true , " packer1.writeBit( 0 , true , 4 );" );



             packer2.writeU8(1,0x00);
             packer2.writeBit( 0 , true , 1 , true );


             if( packer2.readU8(1) != 0b1000_0000 ) 
             {
                throw new Error("packer2.readU8(1) != 0b1000_0000");
             } 


      });  

      await ctx.test( "writeFalse,readFalse" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : false} ); 

             packer1.writeU8(0,0xFF);
             packer1.writeU8(1,0xFF);
             packer1.writeU8(2,0xFF);

             packer1.writeBit( 1 , false ); 
             packer1.writeBit( 5 , false );
             packer1.writeBit( 8 , false );
             packer1.writeBit( 15 , false );
             packer1.writeBit( 20 , false );
             packer1.writeBit( 22 , false );
             packer1.writeBit( 23 , false );  

                                        

 

             if( packer1.readU8(0) != (( ~0b0010_0010 ) & 0xFF) ) 
             {
                throw new Error(" packer1.readU8(0) != (( ~0b0010_0010 ) & 0xFF)");
             } 

             if( packer1.readU8(1) != ((~0b1000_0001) & 0xFF) ) 
             {
                throw new Error("packer1.readU8(1) != ((~0b1000_0001) & 0xFF)");
             } 

             if( packer1.readU8(2) != ((~0b1101_0000) & 0xFF) ) 
             {
                throw new Error("packer1.readU8(2) != ((~0b1101_0000) & 0xFF)");
             } 


             let packer2 = new  BBPacker( 4 , {bitIndexReverse : false} ); 


             packer2.writeU8(0,0xFF);
             packer2.writeU8(1,0xFF);
             packer2.writeU8(2,0xFF);
             packer2.writeU8(3,0xFF);

             packer2.writeBit( 1 , false , 1); 
             packer2.writeBit( 5 , false , 1 );
             packer2.writeBit( 8 , false , 1 );
             packer2.writeBit( 15 , false , 1 );
             packer2.writeBit( 20 , false , 1 );
             packer2.writeBit( 22 , false , 1 );
             packer2.writeBit( 23 , false , 1 );
     

             if( packer2.readU8(1) != ((~0b0010_0010) & 0xFF) ) 
             {
                throw new Error("packer2.readU8(1) != ((~0b0010_0010) & 0xFF)");
             } 

             if( packer2.readU8(2) != ((~0b1000_0001) & 0xFF) ) 
             {
                throw new Error("packer2.readU8(2) != ((~0b1000_0001) & 0xFF)");
             } 

             if( packer2.readU8(3) != ((~0b1101_0000) & 0xFF) ) 
             {
                throw new Error("packer2.readU8(3) != ((~0b1101_0000) & 0xFF)");
             } 


      });  

      await ctx.test( "writeTrueRev,readTrueRev" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer1.writeU8(0,0x00);
             packer1.writeU8(1,0x00);
             packer1.writeU8(2,0x00);

             packer1.writeBit( 1 , true ); 
             packer1.writeBit( 5 , true );
             packer1.writeBit( 8 , true );
             packer1.writeBit( 15 , true );
             packer1.writeBit( 20 , true );
             packer1.writeBit( 22 , true );
             packer1.writeBit( 23 , true );

          


             if( packer1.readU8(0) != 0b0100_0100 ) 
             {
                throw new Error("packer1.readU8(0) != 0b0100_0100");
             } 

             if( packer1.readU8(1) != 0b1000_0001 ) 
             {
                throw new Error("packer1.readU8(1) != 0b1000_0001");
             } 

             if( packer1.readU8(2) != 0b0000_1011 ) 
             {
                throw new Error("packer1.readU8(2) != 0b0000_1011");
             } 

       assert.throws( () => {    
             packer1.writeBit( 24 , true );
  
         } , () => true , "packer1.writeBit( 24 , true );" );



             let packer2 = new  BBPacker( 4 , {bitIndexReverse : true} ); 


             packer2.writeU8(0,0x00);
             packer2.writeU8(1,0x00);
             packer2.writeU8(2,0x00);
             packer2.writeU8(3,0x00);

             packer2.writeBit( 1 , true , 1); 
             packer2.writeBit( 5 , true , 1 );
             packer2.writeBit( 8 , true , 1 );
             packer2.writeBit( 15 , true , 1 );
             packer2.writeBit( 20 , true , 1 );
             packer2.writeBit( 22 , true , 1 );
             packer2.writeBit( 23 , true , 1 );
     

             if( packer2.readU8(1) != 0b0100_0100 ) 
             {
                throw new Error("packer2.readU8(0) != 0b0100_0100");
             } 

             if( packer2.readU8(2) != 0b1000_0001 ) 
             {
                throw new Error("packer2.readU8(2) != 0b1000_0001");
             } 

             if( packer2.readU8(3) != 0b0000_1011 ) 
             {
                throw new Error("packer2.readU8(3) != 0b0000_1011");
             } 


       assert.throws( () => {    
             packer2.writeBit( 0 , true , 4 );
  
         } , () => true , "packer2.writeBit( 0 , true , 4 );" );



      });  

     await ctx.test( "writeFalseRev,readFalseRev" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer1.writeU8(0,0xFF);
             packer1.writeU8(1,0xFF);
             packer1.writeU8(2,0xFF);

             packer1.writeBit( 1 , false ); 
             packer1.writeBit( 5 , false );
             packer1.writeBit( 8 , false );
             packer1.writeBit( 15 , false );
             packer1.writeBit( 20 , false );
             packer1.writeBit( 22 , false );
             packer1.writeBit( 23 , false );



             if( packer1.readU8(0) != ((~0b0100_0100)&0xFF) ) 
             {
                throw new Error("packer1.readU8(0) != ((~0b0100_0100)&0xFF)");
             } 

             if( packer1.readU8(1) != ((~0b1000_0001)&0xFF) ) 
             {
                throw new Error("packer1.readU8(1) != ((~0b1000_0001)&0xFF)");
             } 

             if( packer1.readU8(2) != ((~0b0000_1011)&0xFF) ) 
             {
                throw new Error("packer1.readU8(2) != ((~0b0000_1011)&0xFF)");
             } 

       assert.throws( () => {    
             packer1.writeBit( 24 , true );
  
         } , () => true , "packer1.writeBit( 24 , true );" );



             let packer2 = new  BBPacker( 4 , {bitIndexReverse : true} ); 


             packer2.writeU8(0,0xFF);
             packer2.writeU8(1,0xFF);
             packer2.writeU8(2,0xFF);
             packer2.writeU8(3,0xFF);

             packer2.writeBit( 1 , false , 1); 
             packer2.writeBit( 5 , false , 1 );
             packer2.writeBit( 8 , false , 1 );
             packer2.writeBit( 15 , false , 1 );
             packer2.writeBit( 20 , false , 1 );
             packer2.writeBit( 22 , false , 1 );
             packer2.writeBit( 23 , false , 1 );
     

             if( packer2.readU8(1) != ((~0b0100_0100)&0xFF) ) 
             {
                throw new Error("packer2.readU8(1) != ((~0b0100_0100)&0xFF)");
             } 

             if( packer2.readU8(2) != ((~0b1000_0001)&0xFF) ) 
             {
                throw new Error("packer2.readU8(2) != ((~0b1000_0001)&0xFF)");
             } 

             if( packer2.readU8(3) != ((~0b0000_1011)&0xFF) ) 
             {
                throw new Error("packer2.readU8(3) != ((~0b0000_1011)&0xFF)");
             } 



       assert.throws( () => {    
             packer2.writeBit( 0 , true , 4 );
  
         } , () => true , "packer2.writeBit( 0 , true , 4 );" );





      });  


      await ctx.test( "writeRev,readRev" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : false} ); 

             packer1.writeU8(0,0x00);
             packer1.writeU8(1,0x00);
             packer1.writeU8(2,0x00);

             packer1.writeBit( 1 , true ); 
             packer1.writeBit( 5 , true );
             packer1.writeBit( 8 , true );
             packer1.writeBit( 15 , true );
             packer1.writeBit( 20 , true );
             packer1.writeBit( 22 , true );
             packer1.writeBit( 23 , true );



             if( packer1.readU8(0) != 0b0010_0010 ) 
             {
                throw new Error("packer1.readU8(0) != 0b0010_0010");
             } 

             if( packer1.readU8(1) != 0b1000_0001 ) 
             {
                throw new Error("packer1.readU8(1) != 0b1000_0001");
             } 

             if( packer1.readU8(2) != 0b1101_0000 ) 
             {
                throw new Error("packer1.readU8(2) != 0b1101_0000");
             } 

       assert.throws( () => {    
             packer1.writeBit( 24 , true );
  
         } , () => true , "packer1.writeBit( 24 , true );" );







             let packer2 = new  BBPacker( 4 , {bitIndexReverse : false} ); 


             packer2.writeU8(0,0x00);
             packer2.writeU8(1,0x00);
             packer2.writeU8(2,0x00);
             packer2.writeU8(3,0x00);

             packer2.writeBit( 1 , true , 1); 
             packer2.writeBit( 5 , true , 1 );
             packer2.writeBit( 8 , true , 1 );
             packer2.writeBit( 15 , true , 1 );
             packer2.writeBit( 20 , true , 1 );
             packer2.writeBit( 22 , true , 1 );
             packer2.writeBit( 23 , true , 1 );
     
             if( packer2.readU8(1) != 0b0010_0010 ) 
             {
                throw new Error("packer2.readU8(1) != 0b0010_0010");
             } 

             if( packer2.readU8(2) != 0b1000_0001 ) 
             {
                throw new Error("packer2.readU8(2) != 0b1000_0001");
             } 

             if( packer2.readU8(3) != 0b1101_0000 ) 
             {
                throw new Error("packer2.readU8(3) != 0b1101_0000");
             } 

       assert.throws( () => {    
             packer1.writeBit( 0 , true , 4 );
  
         } , () => true , "packer1.writeBit( 0 , true , 4 );" );



      });  

      await ctx.test( "readBit" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : false} ); 

             packer1.writeU8(0,0x00);
             packer1.writeU8(1,0x00);
             packer1.writeU8(2,0x00);

             packer1.writeBit( 1 , true ); 
             packer1.writeBit( 5 , true );
             packer1.writeBit( 8 , true );
             packer1.writeBit( 15 , true );
             packer1.writeBit( 20 , true );
             packer1.writeBit( 22 , true );
             packer1.writeBit( 23 , true );


             if(packer1.readBit( 1 ) != true  )
             {
               throw new Error("packer1.readBit( 1 ) != true");
             } 

             if(packer1.readBit( 0 ) != false  )
             {
               throw new Error("packer1.readBit( 0 ) != false");
             } 

             if(packer1.readBit( 5 ) != true  )
             {
               throw new Error("packer1.readBit( 5 ) != true");
             } 

             if(packer1.readBit( 6 ) != false  )
             {
                throw new Error("packer1.readBit( 6 ) != false");
             } 

             if(packer1.readBit( 8 ) != true  )
             {
               throw new Error("packer1.readBit( 8 ) != true");
             } 

             if(packer1.readBit( 9 ) != false  )
             {
               throw new Error("packer1.readBit( 9 ) != false");
             } 

             if(packer1.readBit( 15 ) != true  )
             {
               throw new Error("packer1.readBit( 15 )");
             } 

             if(packer1.readBit( 20 ) != true  )
             {
               throw new Error("packer1.readBit( 20 ) != true");
             } 

             if(packer1.readBit( 22 ) != true  )
             {
                throw new Error("packer1.readBit( 22 ) != true");
             } 

             if(packer1.readBit( 23 ) != true  )
             {
                   throw new Error("packer1.readBit( 23 ) != true");
             } 



       assert.throws( () => {    
             packer1.readBit( 24 );
  
         } , () => true , "packer1.readBit( 24 );" );




             packer1.writeU8(0,0x00);
             packer1.writeU8(1,0x00);
             packer1.writeU8(2,0x00);

             packer1.writeBit( 1 , true , true); 
             packer1.writeBit( 5 , true , true);
             packer1.writeBit( 8 , true , true);
             packer1.writeBit( 15 , true , true);
             packer1.writeBit( 20 , true , true);
             packer1.writeBit( 22 , true , true);
             packer1.writeBit( 23 , true , true);


             if(packer1.readBit( 1 , true) != true  )
             {
               throw new Error("packer1.readBit( 1, true ) != true");
             } 

             if(packer1.readBit( 0, true ) != false  )
             {
               throw new Error("packer1.readBit( 0, true ) != false");
             } 

             if(packer1.readBit( 5, true ) != true  )
             {
               throw new Error("packer1.readBit( 5, true ) != true");
             } 

             if(packer1.readBit( 6, true ) != false  )
             {
                throw new Error("packer1.readBit( 6, true ) != false");
             } 

             if(packer1.readBit( 8, true ) != true  )
             {
               throw new Error("packer1.readBit( 8, true ) != true");
             } 

             if(packer1.readBit( 9, true ) != false  )
             {
               throw new Error("packer1.readBit( 9, true ) != false");
             } 

             if(packer1.readBit( 15, true ) != true  )
             {
               throw new Error("packer1.readBit( 15, true )");
             } 

             if(packer1.readBit( 20, true ) != true  )
             {
               throw new Error("packer1.readBit( 20, true ) != true");
             } 

             if(packer1.readBit( 22, true ) != true  )
             {
                throw new Error("packer1.readBit( 22, true ) != true");
             } 

             if(packer1.readBit( 23, true ) != true  )
             {
                   throw new Error("packer1.readBit( 23, true ) != true");
             } 




             const packer2 = new  BBPacker( 4 , {bitIndexReverse : false} ); 

             packer2.writeU8(0,0x00);
             packer2.writeU8(1,0x00);
             packer2.writeU8(2,0x00);
             packer2.writeU8(3,0x00);


             packer2.writeBit( 1 , true , 1,  true); 
             packer2.writeBit( 5 , true , 1,true);
             packer2.writeBit( 8 , true , 1,true);
             packer2.writeBit( 15 , true , 1,true);
             packer2.writeBit( 20 , true , 1,true);
             packer2.writeBit( 22 , true , 1,true);
             packer2.writeBit( 23 , true , 1,true);


             if(packer2.readBit( 1 , 1 ,true) != true  )
             {
               throw new Error("packer2.readBit( 1, 1 ,true ) != true");
             } 

             if(packer2.readBit( 0, 1 ,true ) != false  )
             {
               throw new Error("packer2.readBit( 0, 1 ,true ) != false");
             } 

             if(packer2.readBit( 5, 1 ,true ) != true  )
             {
               throw new Error("packer2.readBit( 5, 1 ,true ) != true");
             } 

             if(packer2.readBit( 6, 1 ,true ) != false  )
             {
                throw new Error("packer2.readBit( 6, 1 ,true ) != false");
             } 

             if(packer2.readBit( 8, 1 ,true ) != true  )
             {
               throw new Error("packer2.readBit( 8, 1 ,true ) != true");
             } 

             if(packer2.readBit( 9, 1 ,true ) != false  )
             {
               throw new Error("packer2.readBit( 9, 1 ,true ) != false");
             } 

             if(packer2.readBit( 15, 1 ,true ) != true  )
             {
               throw new Error("packer2.readBit( 15, 1 ,true )");
             } 

             if(packer2.readBit( 20, 1 ,true ) != true  )
             {
               throw new Error("packer2.readBit( 20, 1 ,true ) != true");
             } 

             if(packer2.readBit( 22, 1 ,true ) != true  )
             {
                throw new Error("packer2.readBit( 22, 1 ,true ) != true");
             } 

             if(packer2.readBit( 23, 1 ,true ) != true  )
             {
                   throw new Error("packer2.readBit( 23, 1 ,true ) != true");
             } 

       assert.throws( () => {    
             packer2.readBit( 24 , 1 );
  
         } , () => true , "packer2.readBit( 24 , 1 );" );




      });  


      await ctx.test( "toBits,fromBits" , () =>{

             const packer1 = new  BBPacker( 3 , {bitIndexReverse : false} ); 

             packer1.allZerro();


             packer1.toBits(  0b1011 , 7 , 4 );  

       assert.throws( () => {    
             packer1.toBits(  0b1111 , 21 , 4 );
  
         } , () => true , "packer1.toBits(  0b1111 , 21 , 4 );" );


 

             if( packer1.readU8(0) !=  0b1000_0000  ) 
             {
                throw new Error("packer1.readU8(0) !=  0b1000_0000");
             } 

             if( packer1.readU8(1) !=  0b0000_0101 ) 
             {
                throw new Error("packer1.readU8(1) !=  0b0000_0101");
             } 


             if(  packer1.fromBits( 7 , 4 ) != 0b1011 )
             {
               throw new Error("packer1.fromBits( 7 , 4 ) != 0b1011");
             } 



             packer1.toBits(  0b1110 , 20 , 4 ); 

             if( packer1.fromBits(  20 , 4 ) != 0b1110 )
             {
                 throw new Error("packer1.fromBits(  20 , 4 ) != 0b1110");
             } 


       assert.throws( () => {    
             packer1.fromBits(  21 , 4 );
  
         } , () => true , "packer1.fromBits(  21 , 4 );" );


 

             const packer2 = new  BBPacker( 3 , {bitIndexReverse : false} ); 
             packer2.allZerro();


             packer2.toBits(  0b1011 , 7 , 4 , true);  


             if( packer2.readU8(0) !=  0b0000_0001  ) 
             {
                throw new Error("packer2.readU8(0) !=  0b0000_0001");
             } 

             if( packer2.readU8(1) !=  0b0110_0000 ) 
             {
                throw new Error("packer2.readU8(1) !=  0b0110_0000");
             } 


             if(  packer2.fromBits( 7 , 4 , true) != 0b1011 )
             {
               throw new Error("packer2.fromBits( 7 , 4 , true) != 0b1011");
             } 



             const packer3 = new  BBPacker( 3 , {bitIndexReverse : false} ); 
             packer3.allZerro();


             packer3.toBits(  0b1011 , 7 , 4 , { fromMSB : true });  


            if( packer3.readU8(0) !=  0b1000_0000  ) 
             {
                throw new Error("packer3.readU8(0) !=  0b1000_0000");
             } 

             if( packer3.readU8(1) !=  0b0000_0110 ) 
             {
                throw new Error("packer3.readU8(1) !=  0b0000_0110");
             } 


             if(  packer3.fromBits( 7 , 4 , { fromMSB : true }) != 0b1011 )
             {
               throw new Error("packer3.fromBits( 7 , 4 , { fromMSB : true }) != 0b1011");
             } 



             const packer4 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer4.allZerro();


             packer4.toBits(  0b1011 , 7 , 4 );  


            if( packer4.readU8(0) !=  0b0000_0001  ) 
             {
                throw new Error(" packer4.readU8(0) !=  0b0000_0001");
             } 

             if( packer4.readU8(1) !=  0b0110_0000 ) 
             {
                throw new Error("packer4.readU8(1) !=  0b0110_0000");
             } 


             if(  packer4.fromBits( 7 , 4 ) != 0b1011 )
             {
               throw new Error(" packer4.fromBits( 7 , 4 ) != 0b1011");
             } 



             const packer5 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer5.allZerro();


             packer5.toBits(  0b1011 , 7 , 4 , { fromMSB : false } );  


            if( packer5.readU8(0) !=  0b0000_0001  ) 
             {
                throw new Error("packer5.readU8(0) !=  0b0000_0001");
             } 

             if( packer5.readU8(1) !=  0b1010_0000 ) 
             {
                throw new Error("packer5.readU8(1) !=  0b1010_0000");
             } 


             if(  packer5.fromBits( 7 , 4 , { fromMSB : false } ) != 0b1011 )
             {
               throw new Error(" packer5.fromBits( 7 , 4 , { fromMSB : false } ) != 0b1011");
             } 


             const packer6 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer6.allZerro();


             packer6.toBits(  0b1011 , 7 , 4 , { fromMSB : false , bitIndexReverse : false } );  

 
            if( packer6.readU8(0) !=  0b1000_0000  ) 
             {
                throw new Error("packer6.readU8(0) !=  0b1000_0000");
             } 

             if( packer6.readU8(1) !=  0b0000_0101 ) 
             {
                throw new Error("packer6.readU8(1) !=  0b0000_0101");
             } 


             if(  packer6.fromBits( 7 , 4 , { fromMSB : false , bitIndexReverse : false } ) != 0b1011 )
             {
               throw new Error("packer6.fromBits( 7 , 4 , { fromMSB : false , bitIndexReverse : false } ) != 0b1011");
             } 


             const packer7 = new  BBPacker( 3 , {bitIndexReverse : false} ); 

             packer7.allZerro();


             packer7.toBits(  0b1011 , 7 , 4 , 1 );  



             if( packer7.readU8(1) !=  0b1000_0000  ) 
             {
                throw new Error("packer7.readU8(1) !=  0b1000_0000");
             } 

             if( packer7.readU8(2) !=  0b0000_0101 ) 
             {
                throw new Error("packer7.readU8(2) !=  0b0000_0101");
             } 


             if(  packer7.fromBits( 7 , 4 , 1 ) != 0b1011 )
             {
               throw new Error("packer7.fromBits( 7 , 4 , 1 ) != 0b1011");
             } 


             const packer8 = new  BBPacker( 3 , {bitIndexReverse : false} ); 
             packer8.allZerro();


             packer8.toBits(  0b1011 , 7 , 4 , 1 , true);  


             if( packer8.readU8(1) !=  0b0000_0001  ) 
             {
                throw new Error("packer8.readU8(1) !=  0b0000_0001");
             } 

             if( packer8.readU8(2) !=  0b0110_0000 ) 
             {
                throw new Error("packer8.readU8(2) !=  0b0110_0000");
             } 


             if(  packer8.fromBits( 7 , 4 , 1 , true) != 0b1011 )
             {
               throw new Error("packer2.fromBits( 7 , 4 , 1 , true) != 0b1011");
             } 



             const packer9 = new  BBPacker( 3 , {bitIndexReverse : false} ); 
             packer9.allZerro();


             packer9.toBits(  0b1011 , 7 , 4 , 1 , { fromMSB : true });  


            if( packer9.readU8(1) !=  0b1000_0000  ) 
             {
                throw new Error("packer9.readU8(1) !=  0b1000_0000");
             } 

             if( packer9.readU8(2) !=  0b0000_0110 ) 
             {
                throw new Error("packer9.readU8(2) !=  0b0000_0110");
             } 


             if(  packer9.fromBits( 7 , 4 , 1,  { fromMSB : true }) != 0b1011 )
             {
               throw new Error("packer9.fromBits( 7 , 4 , 1 ,{ fromMSB : true }) != 0b1011");
             } 



             const packer10 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer10.allZerro();


             packer10.toBits(  0b1011 , 7 , 4 , 1 );  


            if( packer10.readU8(1) !=  0b0000_0001  ) 
             {
                throw new Error("packer10.readU8(1) !=  0b0000_0001");
             } 

             if( packer10.readU8(2) !=  0b0110_0000 ) 
             {
                throw new Error("packer10.readU8(2) !=  0b0110_0000");
             } 


             if(  packer10.fromBits( 7 , 4 , 1 ) != 0b1011 )
             {
               throw new Error("packer10.fromBits( 7 , 4 , 1) != 0b1011");
             } 



             const packer11 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer11.allZerro();


             packer11.toBits(  0b1011 , 7 , 4 , 1 ,{ fromMSB : false } );  


            if( packer11.readU8(1) !=  0b0000_0001  ) 
             {
                throw new Error("packer11.readU8(1) !=  0b0000_0001");
             } 

             if( packer11.readU8(2) !=  0b1010_0000 ) 
             {
                throw new Error("packer11.readU8(2) !=  0b1010_0000");
             } 


             if(  packer11.fromBits( 7 , 4 , 1 , { fromMSB : false } ) != 0b1011 )
             {
               throw new Error(" packer11.fromBits( 7 , 4 , 1 , { fromMSB : false } ) != 0b1011");
             } 


             const packer12 = new  BBPacker( 3 , {bitIndexReverse : true} ); 

             packer12.allZerro();


             packer12.toBits(  0b1011 , 7 , 4 , 1 ,  { fromMSB : false , bitIndexReverse : false } );  

 
            if( packer12.readU8(1) !=  0b1000_0000  ) 
             {
                throw new Error("packer12.readU8(1) !=  0b1000_0000");
             } 

             if( packer12.readU8(2) !=  0b0000_0101 ) 
             {
                throw new Error("packer12.readU8(2) !=  0b0000_0101");
             } 


             if(  packer12.fromBits( 7 , 4 , 1 , { fromMSB : false , bitIndexReverse : false } ) != 0b1011 )
             {
               throw new Error("packer12.fromBits( 7 , 4 , 1 , { fromMSB : false , bitIndexReverse : false } ) != 0b1011");
             } 




      });  

      await ctx.test( "toBitsBig,fromBitsBig" , () =>{

             let packer = new  BBPacker( 10  ); 

             packer.allZerro();


             packer.toBits(  0xFF55_AAFF , 1 , 32 , { fromMSB : false } );
            

             if( packer.fromBits(  1 , 32 , { fromMSB : false }) != 0xFF55_AAFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : false }) != 0xFF55_AAFF");
             } 

             packer.allZerro();

             packer.toBits(  0xFF55_AAFF , 1 , 32 , { fromMSB : true } );


             if( packer.fromBits(  1 , 32 , { fromMSB : true } ) != 0xFF55_AAFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : true } ) != 0xFF55_AAFF");
             } 

             packer.allZerro();


             packer.toBits(  0x7FFF_FFFF , 1 , 32 , { fromMSB : false } );


             if( packer.fromBits(  1 , 32 , { fromMSB : false } ) != 0x7FFF_FFFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : false } ) != 0x7FFF_FFFF");
             } 


             packer.allZerro();


             packer.toBits(  0x7FFF_FFFF , 1 , 32 , { fromMSB : true } );


             if( packer.fromBits(  1 , 32 , { fromMSB : true } ) != 0x7FFF_FFFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : false } ) != 0x7FFF_FFFF");
             } 

             packer = new  BBPacker( 10 , { bitIndexReverse : true }  ); 

             packer.allZerro();


             packer.toBits(  0xFF55_AAFF , 1 , 32 , { fromMSB : false } );
            

             if( packer.fromBits(  1 , 32 , { fromMSB : false }) != 0xFF55_AAFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : false }) != 0xFF55_AAFF");
             } 

             packer.allZerro();

             packer.toBits(  0xFF55_AAFF , 1 , 32 , { fromMSB : true } );


             if( packer.fromBits(  1 , 32 , { fromMSB : true } ) != 0xFF55_AAFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : true } ) != 0xFF55_AAFF");
             } 

             packer.allZerro();


             packer.toBits(  0x7FFF_FFFF , 1 , 32 , { fromMSB : false } );


             if( packer.fromBits(  1 , 32 , { fromMSB : false } ) != 0x7FFF_FFFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : false } ) != 0x7FFF_FFFF");
             } 


             packer.allZerro();


             packer.toBits(  0x7FFF_FFFF , 1 , 32 , { fromMSB : true } );


             if( packer.fromBits(  1 , 32 , { fromMSB : true } ) != 0x7FFF_FFFF )
             {
                throw new Error("packer.fromBits(  1 , 32 , { fromMSB : false } ) != 0x7FFF_FFFF");
             } 



      });  

       return assert.ok(true); 
  });
 





/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  return assert.ok(true);
}