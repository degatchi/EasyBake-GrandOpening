import './DepositForm.css';
import React, { useState } from 'react';

const DepositForm = ({ depositAmount }) => {
  const animatedForm = () => {
    const tick = document.querySelectorAll('.fa-check');

    tick.forEach((tick) => {
      tick.addEventListener('click', () => {
        // when we click the tick, we get the input
        const input = tick.previousElementSibling;
        // gets the next form field
        const parent = tick.parentElement;
        // gets the next form field after parent
        const nextForm = parent.nextElementSibling;

        if (input.type === 'number' && validateDeposit(input)) {
          // presents 'thank you msg'
          switchActivation(parent, nextForm);
          // clears inputs
          input.value = '';
        } else {
          // activate animation
          //   parent.style.animation = 'shake 0.3s ease';

          // get rid of animation (to allow next activation)
          parent.addEventListener('animationend', () => {
            parent.style.animation = '';
          });
        }

        // after 1.5s, brings back deposit window
        setTimeout(function () {
          switchActivation(nextForm, parent);
        }, 1500);
      });
    });
  };

  const validateDeposit = (deposit) => {
    if (deposit.value === '' || deposit.value <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const switchActivation = (from, to) => {
    from.classList.add('inactive');
    from.classList.remove('active');
    to.classList.add('active');
  };

  animatedForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // prevents page refresh
        const amount = (depositAmount * 10 ** 18).toString();
        depositETHDAI(amount);
      }}
    >
      <div className='field'>
        <div className='field-deposit active'>
          <i />
          <input
            id='depositAmount'
            type='number'
            placeholder='Amount To Deposit . . .'
            required
            ref={(input) => {
              depositAmount = input;
            }}
          />
          <i className='fas fa-check' />
        </div>
        <div className='field-finish inactive'>
          <i className='fas fa-heart' />
          <p className='field-finish-text'>Thank you!</p>
          <i className='fas fa-heart' />
        </div>
      </div>
    </form>
  );
};

export { DepositForm };
