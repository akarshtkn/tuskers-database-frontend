import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { SelectFieldType } from '../../types/NewTypes';

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export type Props = {
  options: SelectFieldType[];
  field: string;
  selectValue: SelectFieldType;
  selectfn: (selected:SelectFieldType) => void;
  error?: string;
}

const Select = ({options, field, selectValue, selectfn, error}:Props) => {

  const handleChange = (option:SelectFieldType) => {
    selectfn(option);
  }

  return (
    <>
    <div className=" flex text-zinc-50 text-xl">{field}</div>
    <Listbox value={selectValue} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-zinc-100 h-10 py-1.5 pl-1 pr-10 text-left shadow-sm ring-1 ring-inset ring-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className={`ml-3 block truncate ${selectValue.value != '' ? "text-zinc-900" : "text-zinc-400"}`}>{selectValue.value != '' ? (selectValue.value) : `Select ${field}`}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <ListboxOption
                    key={option.id}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-amber-500 text-zinc-100' : '',
                        !focus ? 'text-zinc-900' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, focus }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {(option.value)}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-white' : 'text-amber-500',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    {error && <div className="text-red-500 text-sm">{error}</div>}
    </>
  )
}

export default Select;
