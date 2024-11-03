"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { addWord } from "@/lib/api";
import { formSchema, WORD } from "@/types";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "./ui/formInputField";

interface WordNewCardProps {
  setWords: (words: WORD[]) => void;
  setCurrentWord: (currentWord: WORD) => void;
  setError: (error: string) => void;
}

const WordNewCard: React.FC<WordNewCardProps> = ({
  setWords,
  setCurrentWord,
  setError,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
      meaning: "",
      example: "",
    },
  });

  const onSubmit = () => {
    addWord(form.getValues(), setWords, setCurrentWord, setError);
  };

  return (
    <Card className="mb-6 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">
          新しい単語帳を追加
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormInputField
                form={form}
                name="word"
                label="英単語"
                placeholder="英単語を入力してください"
              />
              <FormInputField
                form={form}
                name="meaning"
                label="和訳"
                placeholder="和訳を入力してください"
              />
              <FormInputField
                form={form}
                name="example"
                label="例文"
                placeholder="例文を入力してください"
              />
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> 単語を追加
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordNewCard;
