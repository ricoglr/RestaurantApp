import { StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';
import SearchBar from '@/components/SearchBar';
import useResults from '@/hooks/useResults';
import ResultsList from '@/components/ResultList';

export default function SearchScreen() {
  const [searchApi, results, errorMessage] = useResults();
  const [term, setTerm] = useState('')

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <View>
      <SearchBar 
        term={term}
        onTermChange={setTerm}
        onTermSubmit={()=>searchApi(term)}
      />
      {
        errorMessage ? <Text>{errorMessage}</Text> :       
          results.length == 0 ? 
          <>
            <Text>ERROOOORR!!! PANIC</Text>
          </> 
          : 
          <>
            <ResultsList
              title="Ucuz Restoranlar"
              results={filterResultsByPrice('₺')}
            />
            <ResultsList
              title="Uygun Restoranlar"
              results={filterResultsByPrice('₺₺')}
            />
            <ResultsList
              title="Pahalı Restoranlar"
              results={filterResultsByPrice('₺₺₺')}
            />
          </>
        }
    </View>
  );
}

const styles = StyleSheet.create({});