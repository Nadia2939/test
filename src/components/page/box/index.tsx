import React, {ReactNode} from 'react';
import classNames from 'classnames';

type PageBoxPropsT = {
  children: ReactNode;
  classNames?: string;
  alignment?: 'left' | 'center' | 'right';
  textAlignment?: 'left' | 'center' | 'right';
};

export default function PageBox({
  children,
  classNames: _classNames = undefined,
  textAlignment = 'left',
  alignment = 'left',
}: PageBoxPropsT) {
  return (
    <div
      className={classNames('rounded', _classNames, {
        'mx-auto': alignment === 'center',
        'ml-auto': alignment === 'right',
      })}
    >
      <div className={classNames('', `text-${textAlignment}`)}>{children}</div>
    </div>
  );
}
