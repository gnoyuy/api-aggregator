import { Button, Col, Input, Row, Form, message } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';

import ItemMap from './map';
import styles from './index.less';

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  UserName: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  defaultValue,
  customProps = {}
}: LoginItemProps) => {
  const options: {
    initialValue?: LoginItemProps['defaultValue'];
  } = {};
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const LoginItem: React.FC<LoginItemProps> = (props) => {
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    customProps,
    name,
    ...restProps
  } = props;

  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems: Partial<LoginItemType> = {};
Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];
  LoginItems[key] = (props: LoginItemProps) => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
        />
   );
});

export default LoginItems as LoginItemType;
