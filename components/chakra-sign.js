import { Node, mergeAttributes } from "@tiptap/core"
import React, { useRef, useState } from "react"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import {
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useDisclosure,
  FormLabel,
  Progress,
  Button,
} from "@chakra-ui/react"
import SignaturePad from "react-signature-canvas"

function ChakraSign() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const signatureCanvas = useRef({})
  const [signature, setSignature] = useState(null)
  /**
   * @return a funtion that uses the canvas ref to clear the canvas via a method given by react-signature-canvas
   */
  const clear = () => signatureCanvas.current.clear()
  /**
   * @returns a function that uses the canvas ref to trim the canvas from white space via a method given by react-signature-canvas and
   * saves it in our state
   */
  const save = () => {
    setSignature(
      signatureCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    )
  }

  return (
    <NodeViewWrapper className="chakra-sign">
      <img src={signature} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="First name" />
              <FormLabel>Title</FormLabel>
              <Input placeholder="Type Here" />
              <FormLabel>Company(optional)</FormLabel>
              <Input placeholder="Type Here" />
              <SignaturePad
                ref={signatureCanvas}
                canvasProps={{
                  className: "signatureCanvas",
                }}
              />
              <p>
                <Progress size="xs" isIndeterminate hasStripe />
                Waiting for <strong>Persons</strong> signature
              </p>
              <Button onClick={save}>Save</Button>
              <Button onClick={clear}>Clear</Button>
            </FormControl>
          </ModalBody>
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
