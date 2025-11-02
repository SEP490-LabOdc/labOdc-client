import { useState } from 'react'
import { ApiErrorTypes, type TApiErrors } from './types.ts'
import { Modal, ModalContent } from '@/components/v2/Modal'
import { Table, TableContainer, TBody, Td, Th, THead, Tr } from '@/components/v2/Table'
import { toast } from 'sonner'
import axios from 'axios'

function ValidationErrorModal({ serverResponse }: { serverResponse: TApiErrors }) {
  const [open, setOpen] = useState(true);

  if (serverResponse.error !== ApiErrorTypes.ValidationError) {
    return null;
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <ModalContent title="Validation Error Details">
        <TableContainer>
          <Table>
            <THead>
              <Tr>
                <Th>Field</Th>
                <Th>Issue</Th>
              </Tr>
            </THead>
            <TBody>
              {serverResponse.message?.map(({ message, path }) => (
                <Tr key={path.join(".")}>
                  <Td>{path.join(".")}</Td>
                  <Td>{message.toLowerCase()}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableContainer>
      </ModalContent>
    </Modal>
  );
}

export const onRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) => {
    const serverResponse = error.response?.data as TApiErrors;
    if(serverResponse?.error === ApiErrorTypes.ValidationError) {
      toast.error("Please check the input and try again.");
      return;
    };
  }
}