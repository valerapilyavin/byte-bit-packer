import {suite,it,TestContext} from 'node:test';
import assert from 'node:assert/strict';
import {BBPacker} from "../../dist/BBPacker.js"





export async function tst10()
{
    


  it('forAll', async (ctx) => {
    

      await ctx.test( "forAllUint8" , () =>{

         let packer =   BBPacker.fromUint8( [ 0x55 , 0xAA ] );   
               
         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != 0x55 )
               {
                  throw new Error("forAll_1:data != 0x55");
               }

            }else if( index == 1 )
            {
               if( data != 0xAA )
               {
                  throw new Error("forAll_1:data != 0xAA");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packer.forAllUint8( forAll_1 ); 

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != 0x55 )
               {
                  throw new Error("forAll_2:data != 0x55");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != 0xAA )
               {
                  throw new Error("forAll_2:data != 0xAA");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packer.forAllUint8( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != 0xAA )
               {
                  throw new Error("forAll_3:data != 0xAA");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packer.forAllUint8( forAll_3 , 1 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packer.forAllUint8( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packer.forAllUint8( forAll_4 , 2 );
  
         } , () => true , "packer.forAllUint8( forAll_4 , 2 );" );

       assert.throws( () => {    
            packer.forAllUint8( forAll_4 , 0 , 3 );
  
         } , () => true , "packer.forAllUint8( forAll_4 , 0 , 3 );" );





         packer =   BBPacker.fromUint8( [ ] ); 
         packer.forAllUint8( forAll_4 );
         packer.forAllUint8( forAll_4 , 0 , 0 );




           return assert.ok(true); 
      });  

      await ctx.test( "forAllInt8" , () =>{

         let packer =   BBPacker.fromInt8( [ -1 , -2 ] );   
               
         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != -1 )
               {
                  throw new Error("forAll_1:data != -1");
               }

            }else if( index == 1 )
            {
               if( data != -2 )
               {
                  throw new Error("forAll_1:data != -2");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packer.forAllInt8( forAll_1 ); 

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != -1 )
               {
                  throw new Error("forAll_2:data != -1");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != -2 )
               {
                  throw new Error("forAll_2:data != -2");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packer.forAllInt8( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != -2 )
               {
                  throw new Error("forAll_3:data != -2");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packer.forAllInt8( forAll_3 , 1 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packer.forAllInt8( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 
       assert.throws( () => {    
            packer.forAllInt8( forAll_4 , 2 );
  
         } , () => true , "packer.forAllInt8( forAll_4 , 2 );" );


       assert.throws( () => {    
            packer.forAllInt8( forAll_4 , 0 , 3 );
  
         } , () => true , "packer.forAllInt8( forAll_4 , 0 , 3 );" );



         packer =   BBPacker.fromInt8( [ ] ); 
         packer.forAllInt8( forAll_4 );
         packer.forAllInt8( forAll_4 , 0 , 0 );



           return assert.ok(true); 
      });  

      await ctx.test( "forAllUint16" , () =>{

         let packerTrue =  new BBPacker( 5 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 5 , {littleEndian:false} );   
               
         packerTrue.writeArrU16( 0 , [ 1000 , 1500 ] );      
         packerFalse.writeArrU16( 0 , [ 1000 , 1500 ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != 1000 )
               {
                  throw new Error("forAll_1_True:data != 1000");
               }

            }else if( index == 1 )
            {
               if( data != 1500 )
               {
                  throw new Error("forAll_1:data != 1500");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllUint16( forAll_1 ); 

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllUint16( forAll_1 , true ); 

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != 1000 )
               {
                  throw new Error("forAll_2:data != 1000");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != 1500 )
               {
                  throw new Error("forAll_2:data != 1500");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllUint16( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllUint16( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != 1500 )
               {
                  throw new Error("forAll_3:data != 1500");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllUint16( forAll_3 , 2 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllUint16( forAll_3 , 2 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllUint16( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllUint16( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllUint16( forAll_4 , 5 );
  
         } , () => true , "packerTrue.forAllUint16( forAll_4 , 5 );" );

       assert.throws( () => {    
            packerTrue.forAllUint16( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllUint16( forAll_4 , 0 , 3 );" );





         let packer =   BBPacker.fromUint16( [ ] ); 
         if( packer.forAllUint16( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint16( forAll_4 ) != true");
         }

         if( packer.forAllUint16( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllUint16( forAll_4 , 0 , 0 ) != true");
         }
          
         packer = new BBPacker(1);
           
         if( packer.forAllUint16( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint16( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

      await ctx.test( "forAllInt16" , () =>{

         let packerTrue =  new BBPacker( 5 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 5 , {littleEndian:false} );   
               
         packerTrue.writeArrI16( 0 , [ -1000 , -1500 ] );      
         packerFalse.writeArrI16( 0 , [ -1000 , -1500 ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != -1000 )
               {
                  throw new Error("forAll_1_True:data != -1000");
               }

            }else if( index == 1 )
            {
               if( data != -1500 )
               {
                  throw new Error("forAll_1:data != -1500");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllInt16( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllInt16( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != -1000 )
               {
                  throw new Error("forAll_2:data != -1000");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != -1500 )
               {
                  throw new Error("forAll_2:data != -1500");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllInt16( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllInt16( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != -1500 )
               {
                  throw new Error("forAll_3:data != -1500");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllInt16( forAll_3 , 2 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllInt16( forAll_3 , 2 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllInt16( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllInt16( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllInt16( forAll_4 , 5 );
  
         } , () => true , "packerTrue.forAllInt16( forAll_4 , 5 );" );

       assert.throws( () => {    
            packerTrue.forAllInt16( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllInt16( forAll_4 , 0 , 3 );" );




         let packer =   BBPacker.fromInt16( [ ] ); 
         if( packer.forAllInt16( forAll_4 ) != true )
         {
            throw new Error("packer.forAllInt16( forAll_4 ) != true");
         }

         if( packer.forAllInt16( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllInt16( forAll_4 , 0 , 0 ) != true");
         }
          
         packer = new BBPacker(1);
           
         if( packer.forAllInt16( forAll_4 ) != true )
         {
            throw new Error("packer.forAllInt16( forAll_4 ) != true");
         }




           return assert.ok(true); 
      });  

      await ctx.test( "forAllUInt32" , () =>{

         let packerTrue =  new BBPacker( 9 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 9 , {littleEndian:false} );   
               
         

         packerTrue.writeArrU32( 0 , [ 100000 , 150000 ] );      
         packerFalse.writeArrU32( 0 , [ 100000 , 150000 ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != 100000 )
               {
                  throw new Error("forAll_1_True:data != 100000");
               }

            }else if( index == 1 )
            {
               if( data != 150000 )
               {
                  throw new Error("forAll_1:data != 150000");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllUint32( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllUint32( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != 100000 )
               {
                  throw new Error("forAll_2:data != 100000");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != 150000 )
               {
                  throw new Error("forAll_2:data != 150000");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllUint32( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllUint32( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != 150000 )
               {
                  throw new Error("forAll_3:data != 150000");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllUint32( forAll_3 , 4 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllUint32( forAll_3 , 4 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllUint32( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllUint32( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllUint32( forAll_4 , 9 );
  
         } , () => true , "packerTrue.forAllUint32( forAll_4 , 9 );" );

       assert.throws( () => {    
            packerTrue.forAllUint32( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllUint32( forAll_4 , 0 , 3 );" );





         let packer =   BBPacker.fromUint32( [ ] ); 
         if(packer.forAllUint32( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint32( forAll_4 ) != true");
         }
         if(packer.forAllUint32( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllUint32( forAll_4 , 0 , 0 ) != true");
         }

         packer = new BBPacker(3);
           
         if( packer.forAllUint32( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint32( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

      await ctx.test( "forAllInt32" , () =>{

         let packerTrue =  new BBPacker( 9 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 9 , {littleEndian:false} );   
               
         

         packerTrue.writeArrI32( 0 , [ -100000 , -150000 ] );      
         packerFalse.writeArrI32( 0 , [ -100000 , -150000 ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != -100000 )
               {
                  throw new Error("forAll_1_True:data != -100000");
               }

            }else if( index == 1 )
            {
               if( data != -150000 )
               {
                  throw new Error("forAll_1:data != -150000");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllInt32( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllInt32( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != -100000 )
               {
                  throw new Error("forAll_2:data != -100000");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != -150000 )
               {
                  throw new Error("forAll_2:data != -150000");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllInt32( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllInt32( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != -150000 )
               {
                  throw new Error("forAll_3:data != -150000");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllInt32( forAll_3 , 4 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllInt32( forAll_3 , 4 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllInt32( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllInt32( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllInt32( forAll_4 , 9 );
  
         } , () => true , "packerTrue.forAllInt32( forAll_4 , 9 );" );

       assert.throws( () => {    
            packerTrue.forAllInt32( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllInt32( forAll_4 , 0 , 3 );" );




         let packer =   BBPacker.fromInt32( [ ] ); 
         if(packer.forAllInt32( forAll_4 ) != true )
         {
            throw new Error("packer.forAllInt32( forAll_4 ) != true");
         }
         if(packer.forAllInt32( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllInt32( forAll_4 , 0 , 0 ) != true");
         }

         packer = new BBPacker(3);
           
         if( packer.forAllInt32( forAll_4 ) != true )
         {
            throw new Error("packer.forAllInt32( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

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


      await ctx.test( "forAllUInt64" , () =>{

         let packerTrue =  new BBPacker( 17 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 17 , {littleEndian:false} );   
               
         

         packerTrue.writeArrU64( 0 , [ fromBigInt(1_000_000_000_000n ) , fromBigInt(1_000_000_000_500n ) ] );      
         packerFalse.writeArrU64( 0 , [ fromBigInt(1_000_000_000_000n ) , fromBigInt(1_000_000_000_500n ) ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {
            if( index == 0 )
            {
               if( toBigInt(data) != 1_000_000_000_000n )
               {
                  throw new Error("forAll_1_True:data != 1_000_000_000_000n");
               }

            }else if( index == 1 )
            {
               if( toBigInt(data) != 1_000_000_000_500n )
               {
                  throw new Error("forAll_1:data != 1_000_000_000_500n");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllUint64( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllUint64( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {

            counter++;

            if( index == 0 )
            { 
               if( toBigInt(data) != 1_000_000_000_000n )
               {
                  throw new Error("forAll_2:data != 1_000_000_000_000n");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( toBigInt(data) != 1_000_000_000_500n )
               {
                  throw new Error("forAll_2:data != 1_000_000_000_500n");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllUint64( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllUint64( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( toBigInt(data) != 1_000_000_000_500n )
               {
                  throw new Error("forAll_3:data != 1_000_000_000_500n");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllUint64( forAll_3 , 8 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllUint64( forAll_3 , 8 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllUint64( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllUint64( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllUint64( forAll_4 , 17 );
  
         } , () => true , "packerTrue.forAllUint64( forAll_4 , 17 );" );

       assert.throws( () => {    
            packerTrue.forAllUint64( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllUint64( forAll_4 , 0 , 3 );" );





         let packer =   BBPacker.fromUint64( [ ] ); 
         if(packer.forAllUint64( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint64( forAll_4 ) != true");
         }
         if(packer.forAllUint64( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllUint64( forAll_4 , 0 , 0 ) != true");
         }

         packer = new BBPacker(7);
           
         if( packer.forAllUint64( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint64( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

      await ctx.test( "forAllInt64" , () =>{

         let packerTrue =  new BBPacker( 17 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 17 , {littleEndian:false} );   
               
         

         packerTrue.writeArrI64( 0 , [ fromBigInt(-1_000_000_000_000n ) , fromBigInt(-1_000_000_000_500n ) ] );      
         packerFalse.writeArrI64( 0 , [ fromBigInt(-1_000_000_000_000n ) , fromBigInt(-1_000_000_000_500n ) ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {
            if( index == 0 )
            {
               if( toBigInt(data) != -1_000_000_000_000n )
               {
                  throw new Error("forAll_1_True:data != -1_000_000_000_000n");
               }

            }else if( index == 1 )
            {
               if( toBigInt(data) != -1_000_000_000_500n )
               {
                  throw new Error("forAll_1:data != -1_000_000_000_500n");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllInt64( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllInt64( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {

            counter++;

            if( index == 0 )
            { 
               if( toBigInt(data) != -1_000_000_000_000n )
               {
                  throw new Error("forAll_2:data != -1_000_000_000_000n");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( toBigInt(data) != -1_000_000_000_500n )
               {
                  throw new Error("forAll_2:data != -1_000_000_000_500n");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllInt64( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllInt64( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( toBigInt(data) != -1_000_000_000_500n )
               {
                  throw new Error("forAll_3:data != -1_000_000_000_500n");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllInt64( forAll_3 , 8 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllInt64( forAll_3 , 8 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllInt64( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllInt64( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : { hi : number , lo : number  }   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllInt64( forAll_4 , 17 );
  
         } , () => true , "packerTrue.forAllInt64( forAll_4 , 17 );" );

       assert.throws( () => {    
            packerTrue.forAllInt64( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllInt64( forAll_4 , 0 , 3 );" );





         let packer =   BBPacker.fromInt64( [ ] ); 
         if(packer.forAllInt64( forAll_4 ) != true )
         {
            throw new Error("packer.forAllInt64( forAll_4 ) != true");
         }
         if(packer.forAllInt64( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllInt64( forAll_4 , 0 , 0 ) != true");
         }

         packer = new BBPacker(7);
           
         if( packer.forAllInt64( forAll_4 ) != true )
         {
            throw new Error("packer.forAllUint64( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

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


      await ctx.test( "forAllFloat32" , () =>{

         let packerTrue =  new BBPacker( 9 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 9 , {littleEndian:false} );   
               
         

         packerTrue.writeArrF32( 0 , [ -1000.123 , -1500.234 ] );      
         packerFalse.writeArrF32( 0 , [ -1000.123 , -1500.234 ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( !cmp(data,-1000.123) )
               {
                  throw new Error("forAll_1_True:data != -1000.123");
               }

            }else if( index == 1 )
            {
               if( !cmp(data,-1500.234) )
               {
                  throw new Error("forAll_1:data != -1500.234");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllFloat32( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllFloat32( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( !cmp(data,-1000.123) )
               {
                  throw new Error("forAll_2:data != -1000.123");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( !cmp(data,-1500.234) )
               {
                  throw new Error("forAll_2:data != -1500.234");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllFloat32( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllFloat32( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( !cmp(data,-1500.234) )
               {
                  throw new Error("forAll_3:data != -1500.234");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllFloat32( forAll_3 , 4 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllFloat32( forAll_3 , 4 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllFloat32( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllFloat32( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllFloat32( forAll_4 , 9 );
  
         } , () => true , "packerTrue.forAllFloat32( forAll_4 , 9 );" );

       assert.throws( () => {    
            packerTrue.forAllFloat32( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllFloat32( forAll_4 , 0 , 3 );" );





         let packer =   BBPacker.fromFloat32( [ ] ); 
         if(packer.forAllFloat32( forAll_4 ) != true )
         {
            throw new Error("packer.forAllFloat32( forAll_4 ) != true");
         }
         if(packer.forAllFloat32( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllFloat32( forAll_4 , 0 , 0 ) != true");
         }

         packer = new BBPacker(3);
           
         if( packer.forAllFloat32( forAll_4 ) != true )
         {
            throw new Error("packer.forAllFloat32( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

      await ctx.test( "forAllFloat64" , () =>{

         let packerTrue =  new BBPacker( 17 , {littleEndian:true} );   
         let packerFalse =  new BBPacker( 17 , {littleEndian:false} );   
               
         const dig1 = -1123423.2345; 
         const dig2 = -9734678.9876; 



         packerTrue.writeArrF64( 0 , [ dig1 , dig2 ] );      
         packerFalse.writeArrF64( 0 , [ dig1 , dig2 ] , true );      


          

         let counter = 0;      

         function forAll_1( index : number ,  data : number   ) : boolean  
         {
            if( index == 0 )
            {
               if( data != dig1 )
               {
                  throw new Error("forAll_1_True:data != dig1");
               }

            }else if( index == 1 )
            {
               if( data != dig2 )
               {
                  throw new Error("forAll_1:data != dig2");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 

           counter++; 

            return true;
         } 

         let rc = packerTrue.forAllFloat64( forAll_1 ); 
          

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0;
         rc = packerFalse.forAllFloat64( forAll_1 , true ); 
         

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         function forAll_2( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            { 
               if( data != dig1 )
               {
                  throw new Error("forAll_2:data != dig1");
               }
               
               return false;  
               
            }else if( index == 1 )
            {
               if( data != dig2 )
               {
                  throw new Error("forAll_2:data != dig2");
               }

            }  
            else {
                    throw new Error("index > 1");
            } 
            

            return true;
         } 
         
         rc = packerTrue.forAllFloat64( forAll_2 );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 

         counter = 0;

         rc = packerFalse.forAllFloat64( forAll_2 , true );

         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != false )
         {
            throw new Error("rc != false");
         } 


         counter = 0;  

         function forAll_3( index : number ,  data : number   ) : boolean  
         {

            counter++;

            if( index == 0 )
            {
               if( data != dig2 )
               {
                  throw new Error("forAll_3:data != dig2");
               }
                              
            }  
            else {
                    throw new Error("index > 0");
            } 
            

            return true;
         } 


         rc = packerTrue.forAllFloat64( forAll_3 , 8 );


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0;

         rc = packerFalse.forAllFloat64( forAll_3 , 8 , true);


         if( counter != 1 )
         {
            throw new Error("counter != 1");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 


         counter = 0; 

         rc = packerTrue.forAllFloat64( forAll_1 , 0 , 2 );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 

         counter = 0; 

         rc = packerFalse.forAllFloat64( forAll_1 , 0 , 2 , true );

         if( counter != 2 )
         {
            throw new Error("counter != 2");
         }

         if( rc != true )
         {
            throw new Error("rc != true");
         } 



         function forAll_4( index : number ,  data : number   ) : boolean  
         {

            throw new Error("forAll_4:");
   
            return true;
         } 

       assert.throws( () => {    
            packerTrue.forAllFloat64( forAll_4 , 17 );
  
         } , () => true , "packerTrue.forAllFloat64( forAll_4 , 17 );" );

       assert.throws( () => {    
            packerTrue.forAllFloat64( forAll_4 , 0 , 3 );
  
         } , () => true , "packerTrue.forAllFloat64( forAll_4 , 0 , 3 );" );





         let packer =   BBPacker.fromFloat64( [ ] ); 
         if(packer.forAllFloat64( forAll_4 ) != true )
         {
            throw new Error("packer.forAllFloat64( forAll_4 ) != true");
         }
         if(packer.forAllFloat64( forAll_4 , 0 , 0 ) != true )
         {
            throw new Error("packer.forAllFloat64( forAll_4 , 0 , 0 ) != true");
         }

         packer = new BBPacker(7);
           
         if( packer.forAllFloat64( forAll_4 ) != true )
         {
            throw new Error("packer.forAllFloat64( forAll_4 ) != true");
         }



           return assert.ok(true); 
      });  

       return assert.ok(true); 
  });
 

  it('UtoI', async () => {

     const packer =  new BBPacker( 10 ); 

     const dig = -125;  
      
     packer.writeU8( 0 , dig );
     
     if( packer.readI8( 0 ) != dig  )
     {
        throw new Error("packer.readI8( 0 ) != dig");
     } 

     if( BBPacker.U8toI8(packer.readU8( 0 )) != dig  )  
     {
        throw new Error("BBPacker.U8toI8(packer.readU8( 0 )) != dig");
     }

     packer.writeU16( 0 , dig );
     
     if( packer.readI16( 0 ) != dig  )
     {
        throw new Error("packer.readI16( 0 ) != dig");
     } 

     if( BBPacker.U16toI16(packer.readU16( 0 )) != dig  )  
     {
        throw new Error("BBPacker.U16toI16(packer.readU16( 0 )) != dig");
     }

     packer.writeU32( 0 , dig );
     
     if( packer.readI32( 0 ) != dig  )
     {
        throw new Error("packer.readI32( 0 ) != dig");
     } 

     if( BBPacker.U32toI32(packer.readU32( 0 )) != dig  )  
     {
        throw new Error("BBPacker.U32toI32(packer.readU32( 0 )) != dig");
     }


/////
     const dig1 = 125;  
      
     packer.writeU8( 0 , dig1 );
     
     if( packer.readI8( 0 ) != dig1  )
     {
        throw new Error("packer.readI8( 0 ) != dig1");
     } 

     if( BBPacker.U8toI8(packer.readU8( 0 )) != dig1  )  
     {
        throw new Error("BBPacker.U8toI8(packer.readU8( 0 )) != dig1");
     }

     packer.writeU16( 0 , dig1 );
     
     if( packer.readI16( 0 ) != dig1  )
     {
        throw new Error("packer.readI16( 0 ) != dig1");
     } 

     if( BBPacker.U16toI16(packer.readU16( 0 )) != dig1  )  
     {
        throw new Error("BBPacker.U16toI16(packer.readU16( 0 )) != dig1");
     }

     packer.writeU32( 0 , dig1 );
     
     if( packer.readI32( 0 ) != dig1  )
     {
        throw new Error("packer.readI32( 0 ) != dig1");
     } 

     if( BBPacker.U32toI32(packer.readU32( 0 )) != dig1  )  
     {
        throw new Error("BBPacker.U32toI32(packer.readU32( 0 )) != dig1");
     }






   });



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

  return assert.ok(true);
}