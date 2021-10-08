import { useForm } from 'react-hook-form';

import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { addPostCategory } from '@/actions/postActions';
import ListAltIcon from '@/components/icons/others/listAlt';

export interface AddCategoryProps {
  isOpen: boolean;
  toggle: () => void;
  mutate: () => void;
}

export default function AddCategory({
  isOpen,
  toggle,
  mutate,
}: AddCategoryProps) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    await addPostCategory(values);
    reset();
    mutate();
    toggle();
  };

  return (
    <Container>
      <Modal isOpen={isOpen} toggle={toggle} backdrop={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="grey-text">
            <Input name="name" label="Nom" ref={register()}>
              <ListAltIcon className="h-3" />
            </Input>
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" size="sm" onClick={toggle} className="mr-2">
              Annuler
            </Button>
            <Button size="sm" color="primary" type="submit">
              Ajouter
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
}
