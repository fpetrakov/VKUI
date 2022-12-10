import React, { useContext, useRef, useEffect } from 'react';
import { Headline, Link, classNames, ActionSheet, ActionSheetItem } from '@vkui';
import { Icon16Dropdown } from '@vkontakte/icons';
import './Setting.css';
import { StyleGuideContext } from '../StyleGuide/StyleGuideRenderer';
import { RichTooltip } from '@vkui/components/RichTooltip/RichTooltip';

export const Setting = ({
  label,
  onChange,
  value,
  options,
  children,
  disabled,
  hint,
  className,
}) => {
  const { setPopout } = useContext(StyleGuideContext);
  const ref = useRef();

  useEffect(
    () => () => {
      setPopout(null);
    },
    [],
  );

  const labelJsx = <span className="Setting__label">{label}:&nbsp;</span>;

  return (
    <Headline
      className={classNames('Setting', className, disabled && 'Setting--disabled')}
      weight="3"
    >
      {hint ? (
        <RichTooltip
          placement="top"
          content={<div style={{ padding: '8px 12px 9px' }}>{hint}</div>}
        >
          {labelJsx}
        </RichTooltip>
      ) : (
        labelJsx
      )}
      {Array.isArray(options) && (
        <Link
          className="Setting__value"
          getRootRef={ref}
          disabled={disabled}
          onClick={() => {
            setPopout(
              <ActionSheet toggleRef={ref} onClose={() => setPopout(null)}>
                {options.map((item) => {
                  const isPrimitive = typeof item === 'string' || typeof item === 'number';
                  const option = isPrimitive ? item : item.value;
                  const title = isPrimitive ? item : item.title;
                  return (
                    <ActionSheetItem
                      autoClose
                      key={option}
                      value={option}
                      onClick={() => onChange(option)}
                    >
                      {title}
                    </ActionSheetItem>
                  );
                })}
              </ActionSheet>,
            );
          }}
        >
          {value}
          <Icon16Dropdown />
        </Link>
      )}
      {children}
    </Headline>
  );
};
