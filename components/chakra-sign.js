import { Node, mergeAttributes } from "@tiptap/core"

import React, { useRef, useState, useEffect } from "react"
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from "@tiptap/react"
import {

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
  ModalFooter,
  ButtonGroup,
  Box,
  FormErrorMessage
} from "@chakra-ui/react"
import SignaturePad from "react-signature-canvas"


function ChakraSign(props) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [firstName, setFirstName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const [signatureData, setSignatureData] = useState([]);
  const [signatureImg, setSignatureImg] = useState(null);
  const [signatureEnd, setSignatureEnd] = useState(false);

  const canvasRef = useRef();
  {/*
  Each input field holds a state that can be saved and retrieved
  for error protection its best practice to set the state to null
  or empty when starting up
  */}
  useEffect(() => {
    canvasRef.current?.fromData(signatureData);
  }, [isOpen, signatureData])

  const modalClose = () => {

  }

  const modalOpen = () => {
    onOpen();
  }

  const Delete = () => {
    props.deleteNode()
    onClose();
  }
  
  {/*Signature modal holds props (which stands for properties)
  object argument with data and returns a React element*/}
  
  const noEmptyField = !canvasRef.current?.isEmpty() && firstName !== "" && title !== "";

  const Save = () => {
    if (noEmptyField) {
      setSignatureData(canvasRef.current?.toData());
      setSignatureImg(canvasRef.current?.getTrimmedCanvas().toDataURL("image/png"));
      onClose();
    }
  }

  const Clear = () => {
    setSignatureData([]);
    setSignatureImg(null);
    setSignatureEnd(false);

    {/*Save and clear functionality. Save is set to a DataURL image with .png properties */}
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

      <div>
        <Box p="2" border="1px" onClick={modalOpen}>
          { signatureImg ? <img src={signatureImg} alt="signature" /> : <p>Sign Here</p> }
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <FormControl isRequired isInvalid={firstName === ""}>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <FormErrorMessage>First Name is required.</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={title === ""}>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Type Here" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <FormErrorMessage>Title is required.</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Company(optional)</FormLabel>
                <Input placeholder="Type Here" value={company} onChange={(e) => setCompany(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Signature</FormLabel>
                <Box border="1px" borderRadius="md" color="gray.200">
                  <SignaturePad ref={canvasRef} onEnd={() => setSignatureEnd(true)} canvasProps={{ style: { width: "100%" }}}/>
                </Box>
                {!signatureEnd && (
                  <Box mt="2">
                    <p>
                      <Progress size="xs" isIndeterminate hasStripe />
                      Waiting for <strong>Persons</strong> signature
                    </p>
                  </Box>
                )}
              </FormControl>
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
      </div>
{/*When the signature is clicked, the Modal, form control has working error checking for
when the input field is empty, There is also styling added to signature border*/}
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

  content: "block*",

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
