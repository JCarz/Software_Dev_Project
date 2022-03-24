import { Node, mergeAttributes } from "@tiptap/core"
import React, { useRef, useState } from "react"
import {
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
} from "@tiptap/react"
import {
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  FormLabel,
  Progress,
  Button
} from "@chakra-ui/react"
import SignaturePad from "react-signature-canvas"

function ChakaraSign({ isOpen, onClose }) {
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
export default ChakaraSign
