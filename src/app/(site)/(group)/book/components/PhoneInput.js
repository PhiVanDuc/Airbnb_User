import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

const PhoneInput = React.forwardRef(function PhoneInput(
  { className, onChange, ...props },
  ref,
) {
  return (
    <RPNInput.default
      ref={ref}
      className={cn("flex")}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      onChange={(value) => onChange?.(value || "")}
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef(function InputComponent(
  { className, ...props },
  ref
) {
  return (
    <div className="w-full">
      <Label
        className="relative"
        htmlFor="InputPhoneNumber"
      >
        <Input
          required
          ref={ref}
          className={cn(
            "peer lg:text-[16px] font-normal rounded-[10px] pt-[43.2px] pb-[25.2px] bg-neutral-100 focus-visible:ring-[2px] focus-visible:ring-blue-200 focus-visible:ring-offset-0 border-transparent focus:border-blue-400 transition-all",
            className
          )}
          id="InputPhoneNumber"
          {...props}
        />
        <span
          className="absolute block top-[50%] translate-y-[-50%] left-[15px] text-[15px] font-normal text-neutral-600 cursor-text peer-focus:text-[13px] peer-focus:text-neutral-500 peer-focus:top-[18px] peer-focus:translate-y-0 peer-valid:text-[13px] peer-valid:text-neutral-500 peer-valid:top-[18px] peer-valid:translate-y-0 transition-all ease-in"
        >
          Phone number
        </span>
      </Label>
    </div>
  );
});
InputComponent.displayName = "InputComponent";

const CountrySelect = ({ disabled, value, onChange, options }) => {
  const handleSelect = React.useCallback(
    (country) => {
      onChange(country);
    },
    [onChange],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn("flex gap-[10px] rounded-[5px] px-[15px] mr-[10px]")}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn(
              "-mr-2 h-4 w-4 opacity-50 text-neutral-400",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-foreground/50 text-sm">
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };