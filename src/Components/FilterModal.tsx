import { Form, Modal } from "react-bootstrap";
import { FilterType } from "../common/types";

type Props = {
  modalState: boolean;
  toggleFilter: (state: boolean) => void;
  activeFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
};

const filters: FilterType[] = [
  {
    id: 1,
    type: "radio",
    label: "Sort: in ascending order",
    sortBy: "ascending",
  },
  {
    id: 2,
    type: "radio",
    label: "Sort: in descending order",
    sortBy: "descending",
  },
  {
    id: 3,
    type: "radio",
    label: "Filter: that are in “Oceania” region",
    sortBy: "oceania",
  },
  {
    id: 4,
    type: "radio",
    label: "Filter: that are smaller than Lithuania by area",
    sortBy: "lt",
  },
];

const FilterModal = ({
  modalState,
  toggleFilter,
  activeFilter,
  onChangeFilter,
}: Props) => {
  return (
    <Modal show={modalState} onHide={() => toggleFilter(!modalState)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Organize country list</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            {filters.map((filter: FilterType) => {
              return (
                <Form.Check
                  type={filter.type}
                  label={filter.label}
                  checked={filter.sortBy === activeFilter.sortBy}
                  onChange={() => {
                    onChangeFilter(filter);
                    toggleFilter(!modalState);
                  }}
                />
              );
            })}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
