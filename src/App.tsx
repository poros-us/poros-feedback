import { createClient } from "@supabase/supabase-js";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

import { Button, 
  Card, CardBody, CardFooter, 
  Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, 
  Heading, Input, Select, Text, Textarea 
} from '@chakra-ui/react';

const supabase = createClient('https://isdffzfwkbflbixveoux.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZGZmemZ3a2JmbGJpeHZlb3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1NDk5NzAsImV4cCI6MjAxMDEyNTk3MH0.T2cnldWGoXgdZBR3PruOLsnXIB2zvoIj97E6Uqt_SJY')

type FormFields = {
  name: string;
  feedbackType: string;
  issue: string;
  details: string;
}

const feedbackTypes = [
  { value: 'request', name: 'Suggestion/Request' },
  { value: 'bug', name: 'Bug/Issue'},
  { value: 'general', name: 'General Feedback' }
]

export default function () {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (formdata: FormFields) => {
    try {
      const { name, feedbackType, issue, details }: FormFields = formdata;

      await supabase
        .from('feedback')
        .insert({name, type: feedbackType, issue, details});
        toast('Thank You For The Feedback', {
          duration: 4000,
          position: "bottom-center",
          style: {
            backgroundColor: '#4C6B7C',
            color: '#CDC6B5'
          }
        })
        reset();
    } catch (err) {
      toast('Error Submitting Feedback', {
        duration: 4000,
        position: "bottom-center",
        style: {
          backgroundColor: '#f44336',
          color: '#131a15'
        }
      })
      console.error(err);
    }
  };

  return (
    <>
      <Flex minW={'100%'} w={'100%'} p={4} flexDirection={'column'} gap={8} mt={8}>
        <Heading w={'100%'} textAlign={'center'}>Feedback Form</Heading>

        <Card w={'100%'} maxW={'768px'} mx={'auto'} bg={'#CDC6B5'}>
          {/* <CardHeader>
            <Heading size={'md'}>Fill Out Form Completely</Heading>
          </CardHeader> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody display={'flex'} flexDirection={'column'} gap={4}>
              <Controller 
                name='name'
                control={control}
                defaultValue=''
                rules={{ 
                  required: "Who Are You?",
                  minLength: { value: 4, message: "Minimum 4 Characters" },
                  pattern: { value: /^[a-zA-Z]+$/, message: 'Only Letters Allowed, Silly Goober' }
                }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Enter Your Name<Text as={"span"} color={"#f44336"}>&#160;&#42;</Text></FormLabel>
                    <Input
                      borderColor={'#69817A'} _hover={{ borderColor: '#69817A55' }}
                      focusBorderColor={"#4C6B7C"} errorBorderColor={"#f44336"}
                      type={'text'}
                      {...field}
                    />
                    <FormErrorMessage color={"#f44336"}>{errors.name?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />

              <Controller
                name='feedbackType'
                control={control}
                defaultValue='request'
                rules={{ required: 'Please Indicate Feedback Type'}}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.feedbackType}>
                    <FormLabel>Type Of Feedback<Text as={"span"} color={"#f44336"}>&#160;&#42;</Text></FormLabel>
                    <Select
                      {...field}
                      size={"md"} borderColor={'#69817A'} _hover={{ borderColor: '#69817A55' }}
                      focusBorderColor={"#4C6B7C"} errorBorderColor={"#f44336"}
                      placeholder={"Select"}
                    >
                      {feedbackTypes.map((feedback) => <option key={feedback.value} value={feedback.value}>
                        {feedback.name}
                      </option>)}
                    </Select>
                    <FormErrorMessage color={"#f44336"}>{errors.feedbackType?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />

              <Controller
                name='issue'
                control={control}
                defaultValue=''
                rules={{ 
                  required: 'Please Fill Out This Field',
                  minLength: 4,
                  maxLength: { value: 30, message: 'Whoa, I said briefly!'}
                }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.issue}>
                    <FormLabel>Briefly Describe Your Feedback<Text as={"span"} color={"#f44336"}>&#160;&#42;</Text></FormLabel>
                      <Input
                        borderColor={'#69817A'} _hover={{ borderColor: '#69817A55' }}
                        focusBorderColor={"#4C6B7C"} errorBorderColor={"#f44336"}
                        type={'text'}
                        {...field}
                      />
                    <FormErrorMessage color={"#f44336"}>{errors.issue?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />

              <Controller
                name='details'
                control={control}
                defaultValue=''
                rules={{ 
                  required: 'Please Give Details',
                  minLength: { value: 50, message: 'Please, Provide More Information' }
                }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.details}>
                    <FormLabel>Provide Details<Text as={"span"} color={"#f44336"}>&#160;&#42;</Text></FormLabel>
                    <Textarea
                      {...field}
                      borderColor={'#69817A'} _hover={{ borderColor: '#69817A55' }}
                      focusBorderColor={"#4C6B7C"} errorBorderColor={"#f44336"}
                    />
                    <FormHelperText color={'#2B3D37'}>Describe your bug&#47;issue and how to reproduce it, elaborate on your feature request, etc.</FormHelperText>
                    <FormErrorMessage color={"#f44336"}>{errors.details?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
            </CardBody>

            <CardFooter display={'flex'} justifyContent={'flex-end'}>
              <Button
                bg={"#69817A"} _hover={{ bg: "#69817A80"}} color={"#CDC6B5"} boxShadow="lg"
                type="submit" isLoading={isSubmitting}
                >
                  Submit Feedback
                </Button>
            </CardFooter>
          </form>
        </Card>
      </Flex>
      <Toaster />
    </>
  )
}
