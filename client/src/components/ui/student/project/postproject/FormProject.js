/**
 * Created by bhuang on 4/27/18.
 */
import React, { Component } from "react";
import Image from "../../../../../../qureative-ui/src/ui/Image";
import TextArea from "../../../../../../qureative-ui/src/ui/TextArea";
import { connect } from "react-redux";
import DropdownList from "../../../../../../qureative-ui/src/ui/DropdownList";
import InputText from "../../../../../../qureative-ui/src/ui/InputText";
import EditPanel from "../../../common/EditPanel";
import TagGroup from "../../../common/TagGroup";
import "../../../../../../css/student/project/postproject/FormProject.scss";

import {
  setProjectCategories,
  setProjectName,
  addProjectImage,
  deleteProjectImage,
  addProjectTextBlock,
  deleteProjectTextBlock,
  setProjectTextBlockText,
  postProject
} from "../../../../../actions/action_project_form";

import { getCategoryItems } from "../../question/postquestion/form-question-desc-config";

class FormProject extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      formProject,
      setProjectCategories,
      setProjectName,
      addProjectTextBlock,
      deleteProjectTextBlock,
      setProjectTextBlockText,
      addProjectImage,
      deleteProjectImage,
      postProject
    } = this.props;

    let itemList = getCategoryItems(formProject, setProjectCategories);

    console.log(formProject);

    return (
      <form
        id="form-proj"
        onSubmit={e => {
          e.preventDefault();
          let project = { data: {} };
          project.data.title = formProject.pname;
          project.data.description = formProject.pDesc;
          project.data.categories = formProject.categories;
          postProject(project, response => {
            //console.log(response);
            this.props.history.push(
              "/project-detail/" + response.data.result
            );
          });
        }}
      >
        <div id="project-form-title">Post a Project</div>
        <div id="form-content">
          <div className="form-field">
            <h4 className="field-title">Creative Category</h4>
            <DropdownList value={formProject.categories} itemList={itemList} />
          </div>

          <div className="form-field">
            <h4 className="field-title">Project Name</h4>
            <div className="qname-wrapper">
              <InputText
                type="text"
                placeholder="eg: a Rhino 4d problem need to be solved"
                name="pname"
                textValue={formProject.pname || ""}
                changeText={setProjectName}
              />
            </div>
          </div>

          {formProject.pDesc &&
            formProject.pDesc.map((block, i) => {
              console.log(block);
              if (block.type === "text") {
                return (
                  <TextArea
                    name="pDesc"
                    key={block.id}
                    id={block.id}
                    value={block.value}
                    placeholder={block.type}
                    deleteTextBlock={deleteProjectTextBlock}
                    setTextBlockText={setProjectTextBlockText}
                  />
                );
              } else if (block.type === "image") {
                return (
                  <Image
                    key={block.id}
                    name="pDesc"
                    publicId={block.id}
                    imgUrl={block.imgUrl}
                    deleteImage={deleteProjectImage}
                  />
                );
              }
            })}

          <div className="panel">
            <div className="panel-container">
              <EditPanel
                name="pDesc"
                addTextBlock={addProjectTextBlock}
                addImage={addProjectImage}
              />
            </div>
          </div>

          <div className="form-field">
            <h4 className="field-title">Add Tags</h4>
            <TagGroup
              name="qTags"
              formQuestion={{ qtags: ["art", "design"] }}
              addTag={null}
              deleteTag={null}
            />
          </div>
        </div>

        <div id="form-proj-buttons">
          <button type="submit" className="qbutton">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

let mapStateToProps = state => ({
  formProject: state.formProject
});

let mapDispatchToProps = dispatch => ({
  setProjectCategories: (name, value) => {
    dispatch(setProjectCategories(name, value));
  },
  setProjectName: (name, value) => {
    dispatch(setProjectName(name, value));
  },
  addProjectTextBlock: (name, blockType) => {
    dispatch(addProjectTextBlock(name, blockType));
  },
  deleteProjectTextBlock: (name, id) => {
    dispatch(deleteProjectTextBlock(name, id));
  },
  setProjectTextBlockText: (name, id, value) => {
    dispatch(setProjectTextBlockText(name, id, value));
  },
  addProjectImage: (name, itemType, uploadResult) => {
    dispatch(addProjectImage(name, itemType, uploadResult));
  },
  deleteProjectImage: (name, public_id) => {
    dispatch(deleteProjectImage(name, public_id));
  },
    postProject: (project, callback) => {
        dispatch(postProject(project, callback));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormProject);
