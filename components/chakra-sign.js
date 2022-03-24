import { Node, mergeAttributes } from "@tiptap/core"
import React, { useRef, useState } from "react"
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react"
import {
  ChakraProvider,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  FormLabel,
  Progress,
  Button,
  ModalFooter,
  ButtonGroup,
} from "@chakra-ui/react"
import SignaturePad from "react-signature-canvas"

function ChakraSign() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const initialRef = React.useRef() //useRef returns a mutable(liable to change) ref object whose .current property is initialized to the passed argument (initialValue).Reference of the componet that has focus on when the modal opens
  const finalRef = React.useRef() //receives focus when the modal closes.
  const [imageURL, setImageURL] = useState(null) // create a state that will contain the url

  const signatureCanvas = useRef({})
  /**
   * @return a funtion that uses the canvas ref to clear the canvas via a method given by react-signature-canvas
   */
  const clear = () => signatureCanvas.current.clear()
  /**
   * @returns a function that uses the canvas ref to trim the canvas from white space via a method given by react-signature-canvas and
   * saves it in our state
   */
  const save = () =>
    console.log(
      signatureCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    )

  return (
    <NodeViewWrapper className="chakra-sign">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Type Here" />
            </FormControl>
            <FormControl>
              <FormLabel>Company(optional)</FormLabel>
              <Input placeholder="Type Here" />
            </FormControl>
            <SignaturePad/>
            <p>
              <Progress size="xs" isIndeterminate hasStripe />
              Waiting for <strong>Persons</strong> signature
            </p>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <ButtonGroup>
              <Button colorScheme="red" onClick={Delete}>Delete</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button colorScheme="green" onClick={Save}>Save</Button>
              <Button onClick={Clear}>Clear</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </NodeViewWrapper>
  )
}

export default Node.create({
  name: "ChakraSign",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "chakra-sign",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["chakra-sign", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ChakraSign)
  },
})
