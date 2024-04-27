import { Button } from "@mui/material";
import React, { useCallback } from "react";
import { useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

export type CampainRefFuncs = {
  refSubmit: () => void
}

const Campaign = React.forwardRef<CampainRefFuncs>(
  (_props, ref) => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (values: unknown) => {
      // form submit action here
      console.log('!!values', values);
    }

    const refSubmit = useCallback(() => {
      console.log('12');

      handleSubmit(onSubmit)()
    }
    , [handleSubmit])

      useImperativeHandle(ref, () => {
      return {
        refSubmit
      }
    }, [refSubmit])


    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Hehe</label>
        <input {...register("hehe")} />

        <Button type="submit" variant="contained"  >Submit</Button>

      </form>
    )
  })

export default Campaign
