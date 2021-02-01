import { addPostCategory } from "../actions/postActions";
import { addStaticPage } from "../actions/staticPageActions";
import { useForm } from "react-hook-form";
import Container from "../components/ui/container";
import Modal from "../components/ui/modal";
import { Input } from "../components/ui/form";
import { ListAltIcon } from "../components/ui/icons";
import { Button } from "../components/ui/button";

export interface AddCategoryProps {
  isOpen: boolean;
  toggle: () => void;
  mutate: () => void;
  page?: boolean;
}

export const AddCategory = ({
  isOpen,
  toggle,
  mutate,
  page,
}: AddCategoryProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    if (page) {
      await addStaticPage(values);
      reset();
      mutate();
      toggle();
    } else {
      await addPostCategory(values);
      reset();
      mutate();
      toggle();
    }
  };

  return (
    <Container>
      <form>
        <Modal isOpen={isOpen} toggle={toggle} backdrop={false}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className="grey-text">
              {page ? (
                <Input name="page" ref={register()} label="Page">
                  <ListAltIcon className="h-3" />
                </Input>
              ) : (
                <Input name="name" label="Nom" ref={register()}>
                  <ListAltIcon className="h-3" />
                </Input>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="danger"
                size="sm"
                onClick={toggle}
                className="mr-2"
              >
                Annuler
              </Button>
              <Button size="sm" color="primary" type="submit">
                Ajouter
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </form>
    </Container>
  );
};
