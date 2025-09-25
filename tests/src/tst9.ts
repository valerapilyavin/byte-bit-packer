import {suite,it,TestContext} from 'node:test';
import assert from 'node:assert/strict';
import {BBPacker} from "../../dist/BBPacker.js"





export async function tst9()
{
    


  it('Move', async (ctx) => {
    

      await ctx.test( "createArrayBuffer" , () =>{

            let packer = new BBPacker(3);
 
            packer.writeU8(0,1);
            packer.writeU8(1,2);
            packer.writeU8(2,3);

            packer.createArrayBuffer( 4 , true );

            if( packer.arrayBufferSize != 4 )
            {
               throw new Error("packer.arrayBufferSize != 4");
            }  

            if( packer.readU8(0) != 1  )
            {
               throw new Error("packer.readU8(0) != 1");
            }

            if( packer.readU8(1) != 2  )
            {
               throw new Error("packer.readU8(1) != 2");
            }

            if( packer.readU8(2) != 3  )
            {
               throw new Error("packer.readU8(2) != 3");
            }


            packer.createArrayBuffer( 2 , true );

            // @ts-ignore
            if( packer.arrayBufferSize != 2 )
            {
               throw new Error("packer.arrayBufferSize != 2");
            }  

            if( packer.readU8(0) != 1  )
            {
               throw new Error("packer.readU8(0) != 1");
            }

            if( packer.readU8(1) != 2  )
            {
               throw new Error("packer.readU8(1) != 2");
            }

            packer.createArrayBuffer( 2 );

            // @ts-ignore
            if( packer.arrayBufferSize != 2 )
            {
               throw new Error("packer.arrayBufferSize != 2");
            }  

            if( packer.readU8(0) == 1  )
            {
               throw new Error("packer.readU8(0) == 1");
            }

            if( packer.readU8(1) == 2  )
            {
               throw new Error("packer.readU8(1) == 2");
            }


             packer.createArrayBuffer( 0 );

            // @ts-ignore
            if( packer.arrayBufferSize != 0 )
            {
               throw new Error("packer.arrayBufferSize != 0");
            }  


             packer.createArrayBuffer( 0 , true);

            // @ts-ignore
            if( packer.arrayBufferSize != 0 )
            {
               throw new Error("packer.arrayBufferSize != 0");
            }  


           return assert.ok(true); 
      });  

      await ctx.test( "getCopyOfArrayBuffer" , () =>{

            let packer = new BBPacker(3);
 
            packer.writeU8(0,1);
            packer.writeU8(1,2);
            packer.writeU8(2,3);


           let arrayBuffer = packer.getCopyOfArrayBuffer( 0 );


           if( arrayBuffer.byteLength != 3 )
           {
             throw new Error("arrayBuffer.byteLength != 3");
           } 

           let newPacker = new BBPacker(arrayBuffer);


            if( newPacker.readU8(0) != 1  )
            {
               throw new Error("newPacker.readU8(0) != 1");
            }

            if( newPacker.readU8(1) != 2  )
            {
               throw new Error("newPacker.readU8(1) != 2");
            }

            if( newPacker.readU8(2) != 3  )
            {
               throw new Error("newPacker.readU8(2) != 3");
            }


           arrayBuffer = packer.getCopyOfArrayBuffer( 0 , 0 );

          if( arrayBuffer.byteLength != 0 )
           {
             throw new Error("arrayBuffer.byteLength != 0");
           } 


           arrayBuffer = packer.getCopyOfArrayBuffer( 1 , 2 );

           newPacker = new BBPacker(arrayBuffer);

           if( arrayBuffer.byteLength != 2 )
           {
             throw new Error("arrayBuffer.byteLength != 2");
           } 


            if( newPacker.readU8(0) != 2  )
            {
               throw new Error("newPacker.readU8(0) != 2");
            }

            if( newPacker.readU8(1) != 3  )
            {
               throw new Error("newPacker.readU8(2) != 3");
            }


 
       assert.throws( () => {    
             packer.getCopyOfArrayBuffer( 3  );
  
         } , () => true , "packer.getCopyOfArrayBuffer( 3  );" );

       assert.throws( () => {    
             packer.getCopyOfArrayBuffer( 0 , 4  );
  
         } , () => true , "packer.getCopyOfArrayBuffer( 0 , 4  );" );




           return assert.ok(true); 
      });  

      await ctx.test( "setCopyOfArrayBuffer" , () =>{

            let packer = new BBPacker(4);
 
            packer.writeU8(0,1);
            packer.writeU8(1,2);
            packer.writeU8(2,3);
            packer.writeU8(3,4);


            let packerFrom = new BBPacker(2);
 
            packerFrom.writeU8(0,0x55);
            packerFrom.writeU8(1,0xAA);
   

            let size = packer.setCopyOfArrayBuffer( 1 , packerFrom.arrayBuffer );

            if( size != 2 )
            {
               throw new Error("size != 2");  
            }

            if( packer.readU8(0) != 1  )
            {
               throw new Error("packer.readU8(0) != 1");
            }

            if( packer.readU8(1) != 0x55  )
            {
               throw new Error("packer.readU8(1) != 0x55");
            }

            if( packer.readU8(2) != 0xAA  )
            {
               throw new Error("packer.readU8(2) != 0xAA");
            }

            if( packer.readU8(3) != 4  )
            {
               throw new Error("packer.readU8(3) != 4");
            }


            packer.writeU8(0,1);
            packer.writeU8(1,2);
            packer.writeU8(2,3);
            packer.writeU8(3,4);

            size = packer.setCopyOfArrayBuffer( 1 , packerFrom.arrayBuffer ,  1 , 1 );

            if( size != 1 )
            {
               throw new Error("size != 2");  
            }

            if( packer.readU8(0) != 1  )
            {
               throw new Error("packer.readU8(0) != 1");
            }

            if( packer.readU8(1) != 0xAA  )
            {
               throw new Error("packer.readU8(1) != 0xAA");
            }

            if( packer.readU8(2) != 3  )
            {
               throw new Error("packer.readU8(2) != 3");
            }

            if( packer.readU8(3) != 4  )
            {
               throw new Error("packer.readU8(3) != 4");
            }

       assert.throws( () => {    
            packer.setCopyOfArrayBuffer( 3 , packerFrom.arrayBuffer );
  
         } , () => true , "packer.setCopyOfArrayBuffer( 3 , packerFrom.arrayBuffer );" );

       assert.throws( () => {    
            packer.setCopyOfArrayBuffer( 0 , packerFrom.arrayBuffer , 3 );
  
         } , () => true , "packer.setCopyOfArrayBuffer( 0 , packerFrom.arrayBuffer , 3 );" );


       assert.throws( () => {    
            packer.setCopyOfArrayBuffer( 0 , packerFrom.arrayBuffer , 2 , 3 );
  
         } , () => true , "packer.setCopyOfArrayBuffer( 0 , packerFrom.arrayBuffer , 2 , 3 );" );



             packerFrom = new BBPacker(6);
  
       assert.throws( () => {    
            packer.setCopyOfArrayBuffer( 0 , packerFrom.arrayBuffer , 5 );
  
         } , () => true , "packer.setCopyOfArrayBuffer( 0 , packerFrom.arrayBuffer , 5 );" );






           return assert.ok(true); 
      });  
      await ctx.test( "pushArrayBuffer" , () =>{

  
 
            let packer = new BBPacker(4);
 
            packer.writeU8(0,1);
            packer.writeU8(1,2);
            packer.writeU8(2,3);
            packer.writeU8(3,4);



            let packerFrom = new BBPacker(2);
 
            packerFrom.writeU8(0,0x55);
            packerFrom.writeU8(1,0xAA);
   
            packer.index = 1; 
            

            let size = packer.pushArrayBuffer( packerFrom.arrayBuffer   )

            if( packer.index != 3 )
            {
               throw new Error("packer.index != 3");
            }


            if( size != 2 )
            {
               throw new Error("size != 2");  
            }

            if( packer.readU8(0) != 1  )
            {
               throw new Error("packer.readU8(0) != 1");
            }

            if( packer.readU8(1) != 0x55  )
            {
               throw new Error("packer.readU8(1) != 0x55");
            }

            if( packer.readU8(2) != 0xAA  )
            {
               throw new Error("packer.readU8(2) != 0xAA");
            }

            if( packer.readU8(3) != 4  )
            {
               throw new Error("packer.readU8(3) != 4");
            }

              

            size = packer.pushArrayBuffer( packerFrom.arrayBuffer ,  1 , 1 );

            if( size != 1 )
            {
               throw new Error("size != 2");  
            }

            if( packer.readU8(0) != 1  )
            {
               throw new Error("packer.readU8(0) != 1");
            }

            if( packer.readU8(1) != 0x55  )
            {
               throw new Error("packer.readU8(1) != 0x55");
            }

            if( packer.readU8(2) != 0xAA  )
            {
               throw new Error("packer.readU8(2) != 0xAA");
            }

            if( packer.readU8(3) != 0xAA  )
            {
               throw new Error("packer.readU8(3) != 0xAA");
            }


       assert.throws( () => {    
            packer.pushArrayBuffer( packerFrom.arrayBuffer ,  1 , 1 );
  
         } , () => true , "packer.pushArrayBuffer( packerFrom.arrayBuffer ,  1 , 1 );" );


            packer.index = 2;


            packer.pushArrayBuffer( packerFrom.arrayBuffer );


            if( packer.readU8(2) != 0x55  )
            {
               throw new Error("packer.readU8(2) != 0x55");
            }

            if( packer.readU8(3) != 0xAA  )
            {
               throw new Error("packer.readU8(3) != 0xAA");
            }


            packer.index = 3;

       assert.throws( () => {    
            packer.pushArrayBuffer( packerFrom.arrayBuffer );
  
         } , () => true , "packer.pushArrayBuffer( packerFrom.arrayBuffer );" );







           return assert.ok(true); 
      });  


       await ctx.test( "getCopyOfBBPacker" , () =>{
           

            let packer = new BBPacker(2 , { littleEndian : false } );
 
            packer.writeU8(0,0x55);
            packer.writeU8(1,0xAA);

            let newPacker = packer.getCopyOfBBPacker(1);

            if( newPacker.arrayBufferSize != 1 )
            {
               throw new Error("newPacker.arrayBufferSize != 1"); 
            }

            if( newPacker.littleEndian != false )
            {
               throw new Error("newPacker.littleEndian != false");
            }

            if( packer.arrayBuffer == newPacker.arrayBuffer )
            {
               throw new Error("packer.arrayBuffer == newPacker.arrayBuffer");
            }        

            if( newPacker.readU8(0) != 0xAA  )
            {
               throw new Error("newPacker.readU8(0) != 0xAA");
            }



            newPacker = packer.getCopyOfBBPacker(0,2);

            if( newPacker.arrayBufferSize != 2 )
            {
               throw new Error("newPacker.arrayBufferSize != 2"); 
            }

            if( newPacker.littleEndian != false )
            {
               throw new Error("newPacker.littleEndian != false");
            }

            if( packer.arrayBuffer == newPacker.arrayBuffer )
            {
               throw new Error("packer.arrayBuffer == newPacker.arrayBuffer");
            }        


            if( newPacker.readU8(0) != 0x55  )
            {
               throw new Error("newPacker.readU8(0) != 0x55");
            }

            if( newPacker.readU8(1) != 0xAA  )
            {
               throw new Error("newPacker.readU8(1) != 0xAA");
            }

       assert.throws( () => {    
            packer.getCopyOfBBPacker(0,3);
  
         } , () => true , "packer.getCopyOfBBPacker(0,3);" );



           return assert.ok(true); 
      });  


       return assert.ok(true); 
  });
 





/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  return assert.ok(true);
}