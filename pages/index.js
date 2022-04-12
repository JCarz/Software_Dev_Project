import {
  Box,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  ListItem,
  OrderedList,
  
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ChakraHeading from "../components/chakra-heading"
import ChakraSign from "../components/chakra-sign"
import Layout from "../layouts/default-layout"
import styles from "./editor.module.css"

export default function Home() {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    extensions: [StarterKit, ChakraHeading, ChakraSign],
    content:
      "<chakra-heading><p>Hello World!</p></chakra-heading> <p>Helloooooo World!</p>",
  })

  const newNodeButton = (text, onClick) => {
    return (
      <Box
        bg="#FAFAFA"
        width="90%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="1em"
        margin="2em"
        cursor="pointer"
        onClick={onClick}
      >
        <HStack padding="0 0.5em">
          <AddIcon />
          <Text fontSize="lg" padding="0 0.5em">
            {text}
          </Text>
        </HStack>
      </Box>
    )
  }

  const clickedAddParagraph = () => {
    editor.commands.insertContent("<p>Hello World!</p>")
  }

  const clickedAddHeading = () => {
    editor.commands.insertContent({
      type: "ChakraHeading",
      attrs: {
        size: "lg",
      },
      content: [
        {
          type: "text",
          text: "Example Text",
        },
      ],
    })
  }

  const clickedAddSignature = () => {
    editor.commands.insertContent({
      type: "ChakraSign",
      attrs: {},
    })
  }

  return (
    <Layout>
      <Flex w="100%" h="100%">
        <Box>
          <Box bg="white" w="285px" h="100%" alignItems="start">
            <Box>
              <Heading padding="1em" size="md">
                Numbered Headings
              </Heading>
            </Box>
            <OrderedList>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </OrderedList>
          </Box>
        </Box>
        <Box h="100%" w="100%" bg="#FAFAFA" overflow="scroll">
          <Box
            maxW="850"
            minH="1100"
            bg="white"
            boxShadow="1px 1px 4px rgba(0, 0, 0, 0.16)"
            margin="50px auto"
            padding="4rem"
          >
            <EditorContent editor={editor} />
          </Box>
        </Box>

        <Box bg="white" w="285px" h="100%" alignItems="start">
          <VStack>
            <Box>
              <Heading padding="1em" size="md">
                Components
              </Heading>
            </Box>

            {newNodeButton("Paragraph", clickedAddParagraph)}
            {newNodeButton("Heading", clickedAddHeading)}
            {newNodeButton("Signature", clickedAddSignature)}
          </VStack>
        </Box>
      </Flex>
    </Layout>
  )
}
