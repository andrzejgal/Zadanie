Dane:
Xaktualna;
numer_sekcji;
max_X_dla sekcji;
YdlaXaktualne;
//oś X idzoe og góry
Xmax section4endX;
Xmin section9endX;

etap :	0  //x od punktu początkowego do Xmax
		1  //x od Xmax do Xmin
		2  //x od Xmin do punktu początkowego

while(run and forward)
{
	czas;
	increment();
}

function increment()
{
	if (Xaktualna<Xmax and etap==0)
	{
		Xaktualna++;
		if (Xaktualna==Xmax) 
		{
			etap=1;
			numer_sekcji=5;
		}
		else
		{
			if (Xaktualn==numer_sekcji)
			{
				numer_sekcji++;
				przeladuj wspólrzędne sekcji;
				pobierz X początkowego Xstart;
				Xaktualna=Xstart;
				oblicz YdlaXaktualne dla Xaktualna;
			}
			
		}
	}
	else if ()
	{
		
	}
	else 
	{
		
	}
	
	Xaktualna++;
	if (Xaktualna < max_X_dla sekcji)
	{
		oblicz YdlaXaktualne dla Xaktualna;
	}
	else{
		numer_sekcji++;
		przeladuj wspólrzędne sekcji;
		pobierz X początkowego Xstart;
		Xaktualna=Xstart;
		oblicz YdlaXaktualne dla Xaktualna;
	}
	return Xaktualna;
}