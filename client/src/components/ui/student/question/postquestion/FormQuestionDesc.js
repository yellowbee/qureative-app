/**
 * Created by bhuang on 2/24/18.
 */

import React, { Component } from "react";
import _ from "lodash";
import RadioButton from "../../../../../../qureative-ui/src/ui/RadioButton";
import {
  setRadioButton,
  setCategories,
  setQuestionName,
  addTextBlock,
  deleteTextBlock,
  setTextBlockText,
  addImage,
    deleteImage,
  addTag,
  deleteTag,
  postQuestion
} from "../../../../../actions/action_question_form";
import RadioButtonGroup from "../../../../../../qureative-ui/src/ui/RadioButtonGroup";
import DropdownList from "../../../../../../qureative-ui/src/ui/DropdownList";
import InputText from "../../../../../../qureative-ui/src/ui/InputText";
import EditPanel from "../../../common/EditPanel";
import {
  getQuestionTypeButtons,
  getThumbnailRadioButtons,
  getCategoryItems
} from "./form-question-desc-config";
import { connect } from "react-redux";
import "../../../../../../css/student/question/postquestion/FormQuestionDesc.scss";
import TextArea from "../../../../../../qureative-ui/src/ui/TextArea";
import Image from "../../../../../../qureative-ui/src/ui/Image";
import TagGroup from "../../../common/TagGroup";

//class FormQuestionDesc extends Component {
class FormQuestionDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.state = {editBlocks: []};
    //this.addEditBlock = this.addEditBlock.bind(this);
    this.validator = this.validator.bind(this);
  }

  /*addEditBlock(type) {
        this.setState({...this.state, editBlocks: [...this.state.editBlocks, type]});
    }*/

  validator(formQuestion) {
    let errors = {};
    if (!formQuestion.qtype) {
      errors.qtype = "Choose a question type";
    }
    if (!formQuestion.categories) {
      errors.categories = "Choose a Category";
    }
    if (!formQuestion.qname) {
      errors.qname = "Give your question a title";
    }
    if (!formQuestion.qDesc) {
      errors.qDesc = "Add at least one block of text";
    }
    if (_.isEmpty(formQuestion.qTags) || formQuestion.qTags.length <= 0) {
      errors.qTags = "Add at least one tag";
    }

    return errors;
  }

  render() {
    let {
      formQuestion,
      setRadioButton,
      setCategories,
      setQuestionName,
      addTextBlock,
      deleteTextBlock,
      setTextBlockText,
        addImage,
        deleteImage,
      addTag,
      deleteTag,
      postQuestion
    } = this.props;
    console.log(formQuestion);
    let buttonList = getQuestionTypeButtons(formQuestion, setRadioButton);
    let itemList = getCategoryItems(formQuestion, setCategories);
    let thumbnailRadioButtonList = getThumbnailRadioButtons(
      formQuestion,
      () => {}
    );
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          let errors = this.validator(formQuestion);
          if (_.isEmpty(errors)) {
            console.log("Form data validation passed: " + errors);
            let question = { data: {} };
            question.data.title = formQuestion.qname;
            question.data.location = "USA";
            question.data.tags = formQuestion.qTags;
            question.data.userName = "Mad Max";
            question.data.description = formQuestion.qDesc;
            question.data.qImage = "/images/graphic-design.png";
            question.data.profileImg = "/images/ben.jpg";
            question.data.price = "80";
            postQuestion(question, response => {
              console.log(response);
              this.props.history.push(
                "/question-pool/question-detail/" + response.data.result
              );
            });
          } else {
            console.log("Form data validation failed: " + errors);
          }
          this.setState({ ...this.state, errors: errors });
        }}
      >
        <div className="form-field">
          <h4 className="field-title">Question Type</h4>
          <RadioButtonGroup buttonList={buttonList} />
          <div style={{ color: "red" }}>
            {this.state.errors &&
              !formQuestion.qtype &&
              this.state.errors.qtype}
          </div>
        </div>

        <div className="form-field">
          <h4 className="field-title">Creative Category</h4>
          <DropdownList value={formQuestion.categories} itemList={itemList} />
          <div style={{ color: "red" }}>
            {this.state.errors &&
              !formQuestion.categories &&
              this.state.errors.categories}
          </div>
        </div>

        <div className="form-field">
          <h4 className="field-title">Question Name</h4>
          <div className="qname-wrapper">
            <InputText
                type="text"
              placeholder="eg: a Rhino 4d problem need to be solved"
              name="qname"
              textValue={formQuestion.qname || ""}
              changeText={setQuestionName}
            />
          </div>
          <div style={{ color: "red" }}>
            {this.state.errors &&
              _.isEmpty(formQuestion.qname) &&
              this.state.errors.qname}
          </div>
        </div>

        {/*this.state.editBlocks.map((block) => (
                    <TextArea placeholder={block}/>
                ))*/}
        {formQuestion.qDesc &&
          formQuestion.qDesc.map((block, i) => {
            console.log(block);
            if (block.type === "text") {
              return (
                <TextArea
                  name="qDesc"
                  key={block.id}
                  id={block.id}
                  value={block.value}
                  placeholder={block.type}
                  deleteTextBlock={deleteTextBlock}
                  setTextBlockText={setTextBlockText}
                />
              );
            } else if (block.type === "image") {
              return(
                  <Image key={block.id} name="qDesc" publicId={block.id} imgUrl={block.imgUrl} deleteImage={deleteImage}/>
              )
            }
          })}

        <div className="panel">
          <div className="panel-container">
            <EditPanel name="qDesc" addTextBlock={addTextBlock} addImage={addImage}/>
          </div>
        </div>
        <div style={{ color: "red" }}>
          {this.state.errors && !formQuestion.qDesc && this.state.errors.qDesc}
        </div>

        <div className="form-field">
          <h4 className="field-title">Add thumbnail image</h4>
          <RadioButtonGroup buttonList={thumbnailRadioButtonList} />
        </div>

        <div className="form-field">
          <h4 className="field-title">Add Tags</h4>
          <TagGroup
            name="qTags"
            formQuestion={formQuestion}
            addTag={addTag}
            deleteTag={deleteTag}
          />
          <div style={{ color: "red" }}>
            {this.state.errors &&
              (!formQuestion.qTags || formQuestion.qTags.length <= 0) &&
              this.state.errors.qTags}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

let mapStateToProps = state => ({
  formQuestion: state.formQuestion
});

let mapDispatchToProps = dispatch => ({
  setRadioButton: (name, id, value) => {
    dispatch(setRadioButton(name, id, value));
  },
  setCategories: (name, value) => {
    dispatch(setCategories(name, value));
  },
  setQuestionName: (name, value) => {
    dispatch(setQuestionName(name, value));
  },
  addTextBlock: (name, blockType) => {
    dispatch(addTextBlock(name, blockType));
  },
  deleteTextBlock: (name, id) => {
    dispatch(deleteTextBlock(name, id));
  },
  setTextBlockText: (name, id, value) => {
    dispatch(setTextBlockText(name, id, value));
  },
  addImage: (name, itemType, uploadResult) => {
    dispatch(addImage(name, itemType, uploadResult));
  },
  deleteImage: (name, public_id) => {
    dispatch(deleteImage(name, public_id));
  },
  addTag: (name, value) => {
    dispatch(addTag(name, value));
  },
  deleteTag: (name, key) => {
    dispatch(deleteTag(name, key));
  },
  postQuestion: (question, callback) => {
    dispatch(postQuestion(question, callback));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormQuestionDesc);
//export default FormQuestionDesc;
