import { Node, mergeAttributes } from "@tiptap/core"
import React, { useRef, useState, useEffect } from "react"
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from "@tiptap/react"
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
