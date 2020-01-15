import {
  Table,
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
  Result
} from "antd";
import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "dva";
import styles from "./style.less";

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

const { Column, ColumnGroup } = Table;

class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      done: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "newtable/fetch",
      payload: {}
    });
  }
  confirmDelete = id => {
    Modal.confirm({
      title: "删除任务",
      content: "确定删除该任务吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => this.handleDelete(id)
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: "newtable/delete",
      payload: {
        id
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log("mmmmmmmmmmmmmm");
      console.log(fieldsValue);
      this.setState({
        done: true
      });
      dispatch({
        type: "newtable/submit",
        payload: fieldsValue
      });
    });
  };
  handleDone = () => {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    this.setState({
      done: false,
      visible: false
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      newtable: { list }
    } = this.props;

    const getModalContent = () => {
      if (this.state.done) {
        return (
          <Result
            status="success"
            title="操作成功"
            subTitle="一系列的信息描述，很短同样也可以带标点。"
            extra={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="First Name" {...this.formLayout}>
            {getFieldDecorator("firstName", {
              rules: [
                {
                  required: true,
                  message: "请输入First Name"
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "your name is not valid name"
                }
              ],
              initialValue: "John"
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="Last Name" {...this.formLayout}>
            {getFieldDecorator("lastName", {
              rules: [
                {
                  required: true,
                  message: "请输入Last Name"
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "your name is not valid name"
                }
              ],
              initialValue: "Doe"
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="Age" {...this.formLayout}>
            {getFieldDecorator("age", {
              rules: [
                {
                  required: true,
                  message: "请输入age"
                },
                {
                  validator: (rule, value, callback) => {
                    if (!value) callback("not valid");
                    if (isNaN(value)) {
                      callback("please enter a valid age");
                    } else if (value < 1) {
                      callback("your age is less than 1?");
                    } else if (value > 200) {
                      callback("your age is greater than 200?");
                    } else {
                      let stringvalue = value.toString();
                      if (stringvalue.charAt(0) === "0") {
                        callback("no leading 0s");
                      }
                    }
                    callback();
                  }
                }
              ]
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="Address">
            {getFieldDecorator("address", {
              rules: [
                {
                  message: "请输入至少五个字符！",
                  min: 5
                }
              ],
              initialValue: "1 whatever Rd, "
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = this.state.done
      ? {
          footer: null,
          onCancel: this.handleDone
        }
      : {
          okText: "确认",
          onOk: this.handleSubmit,
          onCancel: this.handleDone
        };

    return (
      <>
        <Button
          type="dashed"
          style={{
            width: "100%",
            marginBottom: 8
          }}
          icon="plus"
          onClick={this.showModal}
          ref={component => {
            // eslint-disable-next-line  react/no-find-dom-node
            this.addBtn = findDOMNode(component);
          }}
        >
          添加{this.props.list}
        </Button>
        <Table dataSource={list}>
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />

          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Action"
            key="action"
            render={text => (
              <div>
                <span>
                  <button
                    type="button"
                    onClick={() => this.confirmDelete(text.key)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            )}
          />
        </Table>
        <Modal
          title={this.state.done ? null : "添加"}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            this.state.done
              ? {
                  padding: "72px 0"
                }
              : {
                  padding: "28px 0 0"
                }
          }
          destroyOnClose={true}
          visible={this.state.visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </>
    );
  }
}

export default connect(({ newtable, loading }) => ({
  newtable,
  loading: loading.models.newtable
}))(Form.create()(NewTable));
