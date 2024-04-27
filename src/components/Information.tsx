

import  { forwardRef, useImperativeHandle,  } from 'react'
import { useForm } from 'react-hook-form'

const Information = forwardRef((props,ref) => {
  const { register ,handleSubmit} = useForm()

  const onSubmit = (values:unknown)=>{
    console.log('!!values',values);


  }

  useImperativeHandle(ref, () => {
    return {
      submitInformation(){
        handleSubmit(onSubmit)
      }
    };
  }, [handleSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Gender Selection</label>

      {/* <Button  type="submit" variant="contained"  >Submit</Button> */}

  </form>
  )
})

export default Information
